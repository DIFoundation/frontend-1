# NexaPoll: DAO Management dApp Documentation

This document provides a comprehensive overview of the NexaPoll frontend application, a decentralized application (dApp) for creating and managing Decentralized Autonomous Organizations (DAOs).

## 1. Introduction

NexaPoll is a powerful and user-friendly platform that empowers users to create, manage, and participate in DAOs. It provides a complete suite of tools for every aspect of a DAO's lifecycle, from creation and governance to treasury management and member administration.

## 2. Technology Stack

The NexaPoll frontend is built with a modern and robust technology stack:

*   **Framework:** [Next.js](https://nextjs.org/) (v15)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (v5)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) with PostCSS
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) and custom components
*   **Web3 Integration:**
    *   [wagmi](https://wagmi.sh/) (v2) for React Hooks for Ethereum
    *   [viem](https://viem.sh/) as a low-level Ethereum library
    *   [@reown/appkit](https://www.npmjs.com/package/@reown/appkit) for wallet connection UI
*   **State Management:** [TanStack React Query](https://tanstack.com/query/v5) (v5) for server state management
*   **Linting:** [ESLint](https://eslint.org/) (v9)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)

## 3. Getting Started

To get the NexaPoll frontend up and running locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the development server with Turbopack at `http://localhost:3000`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```

4.  **Start the Production Server:**
    ```bash
    npm run start
    ```

5.  **Lint the Code:**
    ```bash
    npm run lint
    ```

## 4. Detailed Screen Breakdown

The application consists of 11 proposed main screens, along with reusable dialogs and modals.

### Landing Page (1 screen)
*   **Purpose:** User onboarding and providing information about the app's features and how to use it.

### Home Page (1 screen)
*   **Purpose:** High-level entry to the app, discover DAOs, links to create or manage DAOs, and onboarding/learning resources.
*   **Visible components:**
    *   Header: Connect Wallet, user address, network indicator.
    *   Search / Filter bar: search by DAO name, token type (ERC20 / ERC721), creator address.
    *   DAO list/grid: each card shows `daoName`, short description, token type, `createdAt`, token address, governor address, and treasury ETH balance.
    *   Create DAO CTA (prominent).
*   **Data / contract calls:**
    *   `GovernorFactory.getDaoCount()` (optional)
    *   `GovernorFactory.getAllDaos()` to populate the list.
    *   For each DAO: `DGPTreasury.getETHBalance()` and optionally `getTokenBalance(token)`.
*   **Actions:**
    *   Click DAO card -> DAO Dashboard.
    *   Click Create DAO -> Create DAO screen.
*   **Access control:** Anyone can view.

### DAO Dashboard / Overview (1 screen per DAO)
*   **Purpose:** A single-page hub for a DAO with tabs for Overview, Treasury, Proposals, Members, Token, and Admin.
*   **Top area:**
    *   DAO name, metadata, creator, `createdAt`.
    *   Addresses: Governor, Timelock, Treasury, Token (with copy-to-clipboard).
    *   Quick stats: ETH in treasury, token `totalSupply` or total NFTs, member count, active proposals count, quorum percentage.
*   **Tabs:**
    *   **Overview (default):** Summary, latest proposals feed, and recent activity.
    *   **Proposals:** List of proposals and a "Create" button.
    *   **Treasury:** Balances, pending withdrawals, and a "Withdraw" CTA for admins via proposal creation.
    *   **Members:** List of members, voting power, and add/remove member controls (owner-only).
    *   **Token:** Token details, minting (if you are a minter/admin), and a transfer link.
    *   **Admin:** Advanced settings like timelock delay and role management (owner/admin only).
*   **Data / contract calls:**
    *   `GovernorFactory.getDao(daoId)` or `getAllDaos()` then filter.
    *   `DGPGovernor.quorumPercentage()`.
    *   `DGPGovernor.listMembers()` (owner-only).
    *   `ERC20VotingPower.totalSupply()` / `ERC721VotingPower.totalSupply()`.
    *   `DGPTreasury.getETHBalance()` and `getTokenBalance(token)`.
    *   `DGPGovernor.getProposalMetadata(proposalId)`.
    *   Governor contract interactions: `getVotes`, `propose`, `castVote`, `state`, `proposalSnapshot`, `proposalDeadline`, `proposalVotes`.
*   **Actions:**
    *   Create proposal -> Proposal creation flow.
    *   Add member / batch add -> Modal with addresses and voting power (owner-only; calls `addMember` / `batchAddMembers`).
    *   Mint voting power -> `mintVotingPower` (owner-only) or via token contract `mint`.
    *   Execute queued proposals -> "Execute" button which calls the timelock.
    *   Transfer token ownership -> `transferOwnership(newOwner)` (owner-only, optional).
*   **Access control:** Tab-level restrictions for owner-only features.

### Create DAO (multi-step wizard) (1 screen with multiple steps)
*   **Purpose:** Create a new DAO using `GovernorFactory.createDAO`.
*   **Steps:**
    1.  **Basic info:** `daoName`, `daoDescription`, `metadataURI` (optional).
    2.  **Token config:** Choose token type (ERC20/ERC721), `tokenName`, `tokenSymbol`, `initialSupply` (ERC20), `maxSupply`, `baseURI` (ERC721), and initial distribution options.
    3.  **Governance params:** `votingDelay` (blocks), `votingPeriod` (blocks), `proposalThreshold`, `timelockDelay` (secs; must be >= 1 day), and quorum percentage.
    4.  **Review & deploy:** Show gas estimates, confirm wallet signature, and call `createDAO(...)`.
*   **Contract calls:** `GovernorFactory.createDAO(...)`.
*   **Post-deploy:** Show addresses returned (governor, timelock, treasury, token) and a link to the DAO Dashboard.
*   **UX notes:** Client-side validation for parameters and security notes.
*   **Access control:** User must be connected to a wallet.

### Proposal Creation (rich metadata) (Modal or dedicated screen)
*   **Purpose:** Create an on-chain proposal via `DGPGovernor.proposeWithMetadata`.
*   **Fields:**
    *   `targets[]` (contract addresses) with a UI helper for common actions.
    *   `values[]` (ETH to send).
    *   `calldatas[]` (ABI-encoded calls) with UX-first builders.
    *   Title, Description, and other metadata fields.
*   **Client-side:** Allow users to build one or multiple actions and show a preview.
*   **Contract call:** `DGPGovernor.proposeWithMetadata(...)`.
*   **Post-create:** Show transaction hash and a link to the proposal page.
*   **Access control:** Must have tokens >= `proposalThreshold`.
*   **UX:** Proposer's address cannot vote on their own proposal.

### Proposal Details + Voting (1 screen per proposal)
*   **Purpose:** Show full proposal metadata, call list, state, votes, voting UI, and timeline.
*   **Top area:** Title, proposer, timestamp, status, and metadata fields.
*   **Call list:** Show each target address, function signature, arguments, and ETH value.
*   **Voting status:** `ForVotes`, `AgainstVotes`, `quorumReachedPct`, start and end blocks, and current state.
*   **Voting UI:** Options for "For," "Against," and "Abstain" with an optional reason field.
*   **Queue/Execute:** Buttons to queue and execute proposals based on their state.
*   **Events / history:** List of state transitions and ballot records.
*   **Data / contract calls:** `getProposalMetadata`, `state`, `proposalSnapshot`, `proposalDeadline`, `proposalVotes`, `getPastVotes`, `castVote`, `castVoteWithReason`, and timelock interactions.
*   **Access control:** Anyone can view. Voting is restricted to token holders during the active period.

### Members Management (sub-screen under DAO) (1 screen / tab)
*   **Purpose:** Admin-only page to manage the member list and mint voting power.
*   **Features:** List of members, add/remove members, and mint voting power.
*   **Data / contract calls:** `listMembers`, `balanceOf`, `addMember`, `batchAddMembers`, `removeMember`, `mintVotingPower`.
*   **Access control:** Owner/admin only.

### Token Details & Minting (1 screen / tab)
*   **Purpose:** Show token details and actions for minters/admins.
*   **Data:** Token information for ERC20 and ERC721.
*   **Actions:** Mint, set `baseURI`, and transfer tokens.
*   **Contract calls:** `mint`, `batchMint`, `setMinter`, `setBaseURI`, `hasRole`.
*   **Access control:** Actions are available only to addresses with the correct roles.

### Treasury (1 screen / tab)
*   **Purpose:** Show ETH and token balances, recent received events, and guide admins to create withdrawal proposals.
*   **Data:** `getETHBalance`, `getTokenBalance`, and `ETHReceived` events.
*   **Actions:** Guide users to create proposals for withdrawals.
*   **Access control:** Withdrawals must be via proposals.

### Proposal Execution & Timelock Queue Page (1 screen / area)
*   **Purpose:** Show queued proposals, ETA, and an "Execute" button when the delay has expired.
*   **Data:** `proposalNeedsQueuing`, `state`, and timelock events.
*   **Actions:** Execute queued calls.
*   **Access control:** May be executable by anyone if the executor role is `address(0)`.

### DAO Admin / Roles & Settings (1 screen / tab)
*   **Purpose:** For the owner to manage timelock admin roles, change governor parameters, and other admin-only checks.
*   **Visible items:** Timelock `minDelay`, role management UI, and buttons to propose role changes.
*   **Contract calls:** `hasRole`, `getRoleMemberCount`, `quorumPercentage`, `proposalThreshold`.
*   **Access control:** Owner-only features.

### User Profile / Wallet Dashboard (1 screen)
*   **Purpose:** For the connected user to see their DAO involvement, tokens held, and vote history.
*   **Data:** `getDaosByCreator`, `balanceOf`, and `VoteCast` events.
*   **Actions:** Quick links to DAO dashboards, pending votes, and proposals to vote on.
*   **Access control:** User must connect their wallet.

## 5. Shared UI Pieces & Modals (reusable)
*   Connect Wallet modal (MetaMask / WalletConnect)
*   Confirm transaction modal (gas estimate)
*   Propose call builder
*   Add Member / Batch Add Member modal
*   Mint Token modal
*   Proposal preview modal
*   Role check & instructions modal

## 6. Routing & Navigation
*   `/`: Landing/Home
*   `/daos`: DAOs list
*   `/dao/[governorAddress]`: DAO Dashboard
*   `/dao/[governorAddress]/proposals`: Proposals list
*   `/dao/[governorAddress]/proposal/[proposalId]`: Proposal details
*   `/dao/[governorAddress]/members`: Members management
*   `/create-dao`: Create DAO wizard
*   `/profile`: User profile

## 7. Backend and Data Considerations
*   **On-chain RPC:** Direct contract calls are possible, but an indexer (like TheGraph) is recommended for lists of proposals and votes for better UX.
*   **Proposal events:** The frontend can read events via `provider.getLogs`, but this can be slow. A light server or a TheGraph subgraph is recommended for production.
*   **Token metadata:** Fetch `tokenURI` via the token contract for ERC721 metadata.

## 8. Edge Cases and UX Defensive Checks
*   The proposer cannot vote on their own proposal (enforced in the UI).
*   Time-based values (in blocks) should be translated to estimated time.
*   Handle both ERC20 and ERC721 tokens gracefully.
*   Show human-friendly error messages for transaction reversions.
*   Implement pagination or search for large DAO lists.
*   Allow proposers to save draft proposals locally.

## 9. Minimal Contract Call List for Frontend Devs
*   **Factory:** `getAllDaos()`, `getDao(daoId)`, `createDAO(...)`, `getDaosByCreator(address)`
*   **Governor:** `proposeWithMetadata(...)`, `propose(...)`, `state(proposalId)`, `proposalSnapshot`, `proposalDeadline`, `getProposalMetadata(proposalId)`, `castVote`, `castVoteWithReason`, `listMembers`, `addMember`, `batchAddMembers`, `removeMember`, `mintVotingPower`, `quorumPercentage()`, `proposalThreshold()`
*   **Timelock:** `hasRole(role, address)`, `grantRole/revokeRole` (via proposals), `execute`, `schedule`
*   **Treasury:** `getETHBalance()`, `getTokenBalance(token)`, `withdrawETH(recipient, amount)`, `withdrawToken(token, recipient, amount)` (only via timelock proposals)
*   **Tokens (ERC20/ERC721):** `mint`, `batchMint`, `balanceOf`, `totalSupply`, `maxSupply`, `hasRole`, `setBaseURI`, `tokenURI`

## 10. Development & Testing Checklist
1.  Integrate wallet connection (wagmi / ethers.js).
2.  Build the DAO list page using `getAllDaos`.
3.  Implement the Create DAO wizard.
4.  Implement the DAO Dashboard.
5.  Implement Proposal creation with a simple treasury withdraw call.
6.  Implement the voting UI.
7.  Implement the queue/execute flow.
8.  Implement member management and minting.
9.  Add event listeners or a TheGraph subgraph for indexing.
10. Add full error handling, confirmations, and transaction state feedback.

## 11. Security & UX Notes
*   Always confirm parameter values before sending a transaction.
*   Show the exact calldata and recipient addresses in the proposal preview.
*   Encourage the use of a timelock long enough (>= 1 day) to allow for off-chain review.
*   For production, consider a backend indexing service for listing proposals and vote histories.
