module.exports = {
    branchPrefix: 'renovate/',
    dryRun: false,
    username: 'renovate',
    gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
    onboarding: false,
    platform: 'github',
    includeForks: true,
    automerge: true,
    repositories: ['angular-ru/angular-ru-sdk'],
    packageRules: [
        {
            description: 'lockFileMaintenance',
            matchUpdateTypes: ['pin', 'digest', 'patch', 'minor', 'major', 'lockFileMaintenance'],
            dependencyDashboardApproval: false,
            stabilityDays: 0
        }
    ]
};
