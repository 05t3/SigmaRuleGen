// Sigma Rule Constants for dropdowns and validation

export const SIGMA_PRODUCTS = [
  'aws',
  'azure', 
  'bitbucket',
  'cisco',
  'gcp',
  'google_workspace',
  'github',
  'm365',
  'okta',
  'onelogin',
  'linux',
  'macos',
  'zeek',
  'windows',
  'huawei',
  'juniper'
] as const;

export const SIGMA_CATEGORIES = [
  'process_creation',
  'file_event', 
  'network_connection',
  'driver_load',
  'image_load',
  'create_remote_thread',
  'pipe_created',
  'dns_query',
  'file_delete',
  'registry_event',
  'ps_script',
  'ps_module',
  'ps_classic_start',
  'ps_classic_provider_start',
  'registry_add',
  'registry_delete',
  'registry_set',
  'registry_rename',
  'process_termination',
  'wmi_event',
  'raw_access_thread',
  'process_access',
  'file_block_executable',
  'file_shredding',
  'clipboard_capture',
  'process_tampering',
  'file_executable_detected',
  'sysmon_status',
  'sysmon_error',
  'dns',
  'firewall',
  'proxy',
  'webserver'
] as const;

export const SIGMA_SERVICES: Record<string, string[]> = {
  aws: ['cloudtrail'],
  azure: ['activitylogs', 'auditlogs', 'riskdetection', 'pim', 'signinlogs'],
  bitbucket: ['audit'],
  cisco: ['duo', 'aaa', 'bgp', 'ldp'],
  gcp: ['gcp.audit'],
  google_workspace: ['google_workspace.admin'],
  github: ['audit'],
  m365: ['audit', 'exchange', 'threat_detection', 'threat_management'],
  okta: ['okta'],
  onelogin: ['onelogin.events'],
  linux: [
    'auditd', 'auth', 'clamav', 'cron', 'guacamole', 'sudo', 'sshd', 'syslog', 'vsftpd'
  ],
  zeek: ['dce_rpc', 'dns', 'http', 'kerberos', 'rdp', 'smb_files', 'x509'],
  windows: [
    'application', 'applocker', 'bits-client', 'codeintegrity-operational',
    'dns-server', 'diagnosis-scripted', 'microsoft-servicebus-client', 
    'printservice-admin', 'printservice-operational', 'powershell', 
    'powershell-classic', 'appmodel-runtime', 'appxdeployment-server',
    'bitlocker', 'capi2', 'certificateservicesclient-lifecycle-system',
    'security', 'system', 'ntlm', 'openssh', 'shell-core', 'smbclient-security'
  ],
  huawei: ['ldp'],
  juniper: ['ldp']
};

export const SIGMA_MODIFIERS = [
  'contains',
  'startswith', 
  'endswith',
  'all',
  'exists',
  'cased',
  're',
  'base64',
  'base64offset',
  'windash',
  'utf16le',
  'utf16be', 
  'utf16',
  'wide',
  'lt',
  'lte',
  'gt',
  'gte',
  'cidr',
  'expand',
  'fieldref'
] as const;

export const SIGMA_STATUSES = [
  'stable',
  'test', 
  'experimental',
  'deprecated'
] as const;

export const SIGMA_LEVELS = [
  'informational',
  'low',
  'medium', 
  'high',
  'critical'
] as const;

export const SIGMA_RELATED_TYPES = [
  'similar',
  'derived',
  'obsoletes', 
  'merged',
  'renamed'
] as const;

export const COMMON_AUTHORS = [
  'Florian Roth',
  'Austin Songer',
  'Nasreddine Bencherchali',
  'Frack113', 
  'pH-T',
  'Thomas Patzke',
  'Christopher Peacock',
  'Elastic',
  'Splunk',
  'Microsoft',
  'Custom Author'
] as const;

export const COMMON_TAGS = [
  'attack.initial_access',
  'attack.execution', 
  'attack.persistence',
  'attack.privilege_escalation',
  'attack.defense_evasion',
  'attack.credential_access',
  'attack.discovery',
  'attack.lateral_movement',
  'attack.collection',
  'attack.command_and_control',
  'attack.exfiltration',
  'attack.impact',
  'attack.t1059',
  'attack.t1055',
  'attack.t1003',
  'attack.t1543',
  'attack.t1021',
  'attack.t1036',
  'attack.t1083',
  'attack.t1070',
  'sysmon'
] as const;