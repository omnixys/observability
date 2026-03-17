# 🧾 Changelog

All notable changes in this project will be documented in this file.


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
