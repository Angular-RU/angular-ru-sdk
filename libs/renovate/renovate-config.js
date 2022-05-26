module.exports = {
    branchPrefix: 'test-renovate/',
    dryRun: true,
    username: 'angular-ru-bot',
    gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
    onboarding: false,
    platform: 'github',
    includeForks: true,
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
