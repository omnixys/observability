# 🧾 Changelog

All notable changes in this project will be documented in this file.


## [1.4.0](https://github.com/omnixys/observability/compare/v1.3.3...v1.4.0) (2026-03-18)

### Other

* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/60e1bd8cdbfaefce26def47e16f502237ad8f7d2))
* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/f47f9586c704ec9e1c0e39abaa63310f8b7c8b16))
* **Other:** fix/realese): fix release ([](https://github.com/omnixys/observability/commit/a753d601e6c3a30aea5e1bf7750ff84e8e97af24))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/6e52d55e8fd8ff75efe2de3780daedeba649a7d4))

### Release

* **Release:** new release ([](https://github.com/omnixys/observability/commit/91aab3fa73429c4eba3e40dbf957344f5d9a38a6))

## [1.3.3](https://github.com/omnixys/observability/compare/v1.3.2...v1.3.3) (2026-03-18)

### Tracing

* **Tracing:** add tracing.interceptor to index.ts ([](https://github.com/omnixys/observability/commit/e33233c152f744acf0aff5e87dd9dd9ef4ae3ade))

## [1.3.2](https://github.com/omnixys/observability/compare/v1.3.1...v1.3.2) (2026-03-18)

### Tracing

* **Tracing:** add tracing.interceptor ([](https://github.com/omnixys/observability/commit/ab57ae288032ac998e747b004bb68fc8a9e87876))

## [1.3.1](https://github.com/omnixys/observability/compare/v1.3.0...v1.3.1) (2026-03-18)

### Index

* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/11200ec646611b542392b40e5a26cbea3b4ee866))

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/43e985207da4876d8989bd1c271c5c10ccf2768a))

## [1.3.0](https://github.com/omnixys/observability/compare/v1.2.0...v1.3.0) (2026-03-18)

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/1ac2db63ccae377443e494475ad9d96d743ae9b9))

### Tracing

* **Tracing:** create tracing context ([](https://github.com/omnixys/observability/commit/21bc6b417b44814ac4490a40e318ee5bca3236c4))

## [1.2.0](https://github.com/omnixys/observability/compare/v1.1.0...v1.2.0) (2026-03-18)

### Logger

* **Logger:** add logger ([](https://github.com/omnixys/observability/commit/d00de09a88c3ee11ea966b8a80b2d3545bc14564))

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/df3ddd7a53b9e2e36c389e9c6cdfe44eec96f765))

## [1.1.0](https://github.com/omnixys/observability/compare/v1.0.2...v1.1.0) (2026-03-17)

### Observability

* **Observability:** finalize pino logger configuration with typed transports and env handling ([](https://github.com/omnixys/observability/commit/e514c8c003ada90048f24dbb77a1da2755303d15))

## [1.0.2](https://github.com/omnixys/observability/compare/v1.0.1...v1.0.2) (2026-03-17)

### Package

* **Package:** update package ([](https://github.com/omnixys/observability/commit/3698ff658cd2e06ab41601e9051c4e33cbba778e))

## [1.0.1](https://github.com/omnixys/observability/compare/v1.0.0...v1.0.1) (2026-03-17)

### Logger

* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/d742110a049368761f985a5e1b063df210ff2987))

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/bd75c4f441f9bbd0e4011acd3955b23e815e6ef6))

## 1.0.0 (2026-03-17)

### ⚠ BREAKING CHANGE

* **Observability:** - replaces previous logging and tracing setup
- services must use ObservabilityModule.forRoot(...)
- logger API changed to scoped logger via logger.child(...)
- env-based configuration removed in favor of module options

### Observability

* **Observability:** introduce unified observability module with logger, tracing and otel integration ([](https://github.com/omnixys/observability/commit/73964545b6fe51a4f29873e43438b8b904c0db0b))

### Other

* **Other:** Initial commit ([](https://github.com/omnixys/observability/commit/6a0de94fd45f1eedc8b9cf43fda6da8acba7426d))
