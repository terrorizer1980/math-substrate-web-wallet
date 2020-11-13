import * as subsocialDefinitions from '@subsocial/types/substrate/interfaces/definitions'
import {Mainnet} from "@edgeware/node-types";

export default {
  plasm: {
    AuthorityId: 'AccountId',
    AuthorityVote: 'u32',
    Claim: {
      amount: 'u128',
      approve: 'BTreeSet<AuthorityId>',
      complete: 'bool',
      decline: 'BTreeSet<AuthorityId>',
      params: 'Lockdrop'
    },
    ClaimId: 'H256',
    ClaimVote: {
      approve: 'bool',
      authority: 'u16',
      claim_id: 'ClaimId'
    },
    DollarRate: 'u128',
    Keys: 'SessionKeys2',
    Lockdrop: {
      duration: 'u64',
      public_key: '[u8; 33]',
      transaction_hash: 'H256',
      type: 'u8',
      value: 'u128'
    },
    PredicateHash: 'H256',
    RefCount: 'u8',
    TickerRate: {
      authority: 'u16',
      btc: 'u128',
      eth: 'u128'
    }
  },
  centrifuge: {
    AnchorData: {
      id: 'H256',
      docRoot: 'H256',
      anchoredBlock: 'u64'
    },
    Fee: {
      key: 'Hash',
      price: 'Balance'
    },
    PreCommitData: {
      signingRoot: 'H256',
      identity: 'H256',
      expirationBlock: 'u64'
    },
    Proof: {
      leafHash: 'H256',
      sortedHashes: 'H256'
    },
    // MultiAccount
    MultiAccountData: {
      threshold: 'u16',
      signatories: 'Vec<AccountId>',
      deposit: 'Balance',
      depositor: 'AccountId'
    },
    // Bridge constants
    ChainId: 'u8',
    ResourceId: '[u8; 32]',
    'chainbridge::ChainId': 'u8',
    DepositNonce: 'u64'
  },
  darwinia: {
    Address: 'AccountId',
    LookupSource: 'AccountId',
    BalanceInfo: 'Null',
    BalanceLock: {
      id: 'LockIdentifier',
      lock_for: 'LockFor',
      lock_reasons: 'LockReasons',
      amount: 'Balance',
      reasons: 'Reasons'
    },
    LockFor: {
      _enum: {
        Common: 'Common',
        Staking: 'StakingLock'
      }
    },
    Common: {
      amount: 'Balance'
    },
    StakingLock: {
      staking_amount: 'Balance',
      unbondings: 'Vec<Unbonding>'
    },
    LockReasons: {
      _enum: {
        Fee: null,
        Misc: null,
        All: null
      }
    },
    Unbonding: {
      amount: 'Balance',
      until: 'BlockNumber'
    },
    AccountData: {
      free: 'Balance',
      reserved: 'Balance',
      free_kton: 'Balance',
      reserved_kton: 'Balance',
      misc_frozen: 'Balance',
      fee_frozen: 'Balance'
    },
    RingBalance: 'Balance',
    KtonBalance: 'Balance',
    TsInMs: 'u64',
    Power: 'u32',
    DepositId: 'U256',
    StakingBalanceT: {
      _enum: {
        RingBalance: 'Balance',
        KtonBalance: 'Balance'
      }
    },
    StakingLedgerT: {
      stash: 'AccountId',
      active_ring: 'Compact<Balance>',
      active_deposit_ring: 'Compact<Balance>',
      active_kton: 'Compact<Balance>',
      deposit_items: 'Vec<TimeDepositItem>',
      ring_staking_lock: 'StakingLock',
      kton_staking_lock: 'StakingLock',
      claimed_rewards: 'Vec<EraIndex>',
      total: 'Compact<Balance>',
      active: 'Compact<Balance>',
      unlocking: 'Vec<UnlockChunk>'
    },
    TimeDepositItem: {
      value: 'Compact<Balance>',
      start_time: 'Compact<TsInMs>',
      expire_time: 'Compact<TsInMs>'
    },
    ExposureT: {
      own_ring_balance: 'Compact<Balance>',
      own_kton_balance: 'Compact<Balance>',
      own_power: 'Power',
      total_power: 'Power',
      others: 'Vec<IndividualExposure>'
    },
    IndividualExposure: {
      who: 'AccountId',
      ring_balance: 'Compact<Balance>',
      kton_balance: 'Compact<Balance>',
      power: 'Power'
    },
    ElectionResultT: {
      elected_stashes: 'Vec<AccountId>',
      exposures: 'Vec<(AccountId, ExposureT)>',
      compute: 'ElectionCompute'
    },
    RKT: {
      r: 'Balance',
      k: 'Balance'
    },
    SpanRecord: {
      slashed: 'RKT',
      paid_out: 'RKT'
    },
    UnappliedSlash: {
      validator: 'AccountId',
      own: 'RKT',
      others: 'Vec<(AccountId, RKT)>',
      reporters: 'Vec<AccountId>',
      payout: 'RKT'
    },
    TreasuryProposal: {
      proposer: 'AccountId',
      beneficiary: 'AccountId',
      ring_value: 'Balance',
      kton_value: 'Balance',
      ring_bond: 'Balance',
      kton_bond: 'Balance'
    },
    MappedRing: 'u128',
    EthereumTransactionIndex: '(H256, u64)',
    EthereumBlockNumber: 'u64',
    EthereumHeader: {
      parent_hash: 'H256',
      timestamp: 'u64',
      number: 'EthereumBlockNumber',
      author: 'EthereumAddress',
      transactions_root: 'H256',
      uncles_hash: 'H256',
      extra_data: 'Bytes',
      state_root: 'H256',
      receipts_root: 'H256',
      log_bloom: 'Bloom',
      gas_used: 'U256',
      gas_limit: 'U256',
      difficulty: 'U256',
      seal: 'Vec<Bytes>',
      hash: 'Option<H256>'
    },
    EthereumAddress: 'H160',
    Bloom: '[u8; 256; Bloom]',
    H128: '[u8; 16; H128]',
    EthashProof: {
      dag_nodes: '(H512, H512)',
      proof: 'Vec<H128>'
    },
    EthereumReceipt: {
      gas_used: 'U256',
      log_bloom: 'Bloom',
      logs: 'Vec<LogEntry>',
      outcome: 'TransactionOutcome'
    },
    EthereumNetworkType: {
      _enum: {
        Mainnet: null,
        Ropsten: null
      }
    },
    RedeemFor: {
      _enum: {
        Token: null,
        Deposit: null
      }
    },
    EthereumReceiptProof: {
      index: 'u64',
      proof: 'Bytes',
      header_hash: 'H256'
    },
    EthereumReceiptProofThing: '(EthereumHeader, EthereumReceiptProof, MMRProof)',
    MMRProof: {
      member_leaf_index: 'u64',
      last_leaf_index: 'u64',
      proof: 'Vec<H256>'
    },
    EthereumRelayHeaderParcel: {
      header: 'EthereumHeader',
      mmr_root: 'H256'
    },
    EthereumRelayProofs: {
      ethash_proof: 'Vec<EthashProof>',
      mmr_proof: 'Vec<H256>'
    },
    OtherSignature: {
      _enum: {
        Eth: 'EcdsaSignature',
        Tron: 'EcdsaSignature'
      }
    },
    EcdsaSignature: '[u8; 65; EcdsaSignature]',
    OtherAddress: {
      _enum: {
        Eth: '[u8; 20; EthereumAddress]',
        Tron: '[u8; 20; TronAddress]'
      }
    },
    AddressT: '[u8; 20; AddressT]',
    MerkleMountainRangeRootLog: {
      prefix: '[u8; 4; Prefix]',
      mmr_root: 'Hash'
    },
    RelayHeaderId: 'u64',
    RelayHeaderParcel: 'EthereumRelayHeaderParcel',
    RelayProofs: 'Vec<u8>',
    RelayAffirmationId: {
      relay_header_id: 'Vec<u8>',
      round: 'u32',
      index: 'u32'
    },
    RelayAffirmationT: {
      relayer: 'AccountId',
      relay_header_parcels: 'Vec<u8>',
      bond: 'Balance',
      maybe_extended_relay_affirmation_id: 'Option<Vec<u8>>',
      verified: 'bool'
    },
    ProxyType: {
      _enum: {
        Any: null,
        NonTransfer: null,
        Governance: null,
        Staking: null,
        IdentityJudgement: null,
        EthereumBridge: null
      }
    },
    BalancesRuntimeDispatchInfo: {
      usable_balance: 'Balance'
    },
    StakingRuntimeDispatchInfo: {
      power: 'Power'
    }
  },
  edgeware: {
    ...Mainnet.types,
    // chain-specific overrides
    RefCount: 'u8'
  },
  kulupu:{
    Difficulty: 'U256',
    DifficultyAndTimestamp: {
      difficulty: 'Difficulty',
      timestamp: 'Moment'
    },
    Era: {
      genesisBlockHash: 'H256',
      finalBlockHash: 'H256',
      finalStateRoot: 'H256'
    }
  },
  stafi: {
    Address: 'AccountId',
    LookupSource: 'AccountId',
    RefCount: 'u8'
  },
  subsocial: Object
    .values(subsocialDefinitions)
    .reduce((res, {types}) => ({
      ...res,
      ...types
    }), {}),
}
