## Sharable Renovate config

#### Usage

[Documentation config presets](https://docs.renovatebot.com/config-presets/)

-   Create file `renovate.json`

```json
{
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": ["@angular-ru/renovate"],
    "baseBranches": ["master"]
}
```

-   Custom rules and custom branch

```json
{
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": ["@angular-ru/renovate"],
    "baseBranches": ["develop"],
    "packageRules": []
}
```

-   `groupSlug` - Slug to use for group (e.g. in branch name). Will be calculated from groupName if null.`
-   `groupName` - Human understandable name for the dependency group.
