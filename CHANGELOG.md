# 🧾 Changelog

All notable changes in this project will be documented in this file.


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
