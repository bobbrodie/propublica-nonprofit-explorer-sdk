# SDK for the ProPublica Nonprofit Explorer API

![CI](https://github.com/bobbrodie/propublica-nonprofit-explorer-sdk/actions/workflows/ci.yml/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/fce01a5e366b175c1f6b/maintainability)](https://codeclimate.com/github/bobbrodie/propublica-nonprofit-explorer-sdk/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/fce01a5e366b175c1f6b/test_coverage)](https://codeclimate.com/github/bobbrodie/propublica-nonprofit-explorer-sdk/test_coverage)

This is an SDK for the [ProPublica Nonprofit Explorer API](https://projects.propublica.org/nonprofits/api/).

---

> Disclaimer: This SDK is not officially supported by ProPublica and I am not
> affiliated with ProPublica in any way.

---

## Usage

### Get an Organization by EIN

```typescript
const client = new Client();
const response = await client.organization(142007220);
```

### Search for an Organization

> Note: `num_pages` is one-indexed but `cur_page` is zero-indexed. This is part
> of the API, so I do not change it.

```typescript
const client = new Client();
const response = await client.search({
  q: 'propublica',
  page: 0,
  'state[id]': 'NY',
  'ntee[id]': 1,
  'c_code[id]': 3,
});
```
