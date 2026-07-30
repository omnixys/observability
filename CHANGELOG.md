# 🧾 Changelog

All notable changes in this project will be documented in this file.


## [3.2.0](https://github.com/omnixys/observability-ts/compare/v3.1.0...v3.2.0) (2026-07-30)

### ⚠ BREAKING CHANGE

* **Observability:** PostHog analytics and feature-flag adapters have been removed. Use @omnixys/analytics-sdk instead.

### Graphql

* **Graphql:** capture resolver operation context ([](https://github.com/omnixys/observability-ts/commit/888c6cad4718da08877732cdabe60c569586dc69))

### Observability

* **Observability:** add browser, react, analytics, and feature-flags modules ([](https://github.com/omnixys/observability-ts/commit/62a49e47f3bc0307a111f81ffadaf26587d62821))
* **Observability:** remove product analytics adapters ([](https://github.com/omnixys/observability-ts/commit/90e4f5c9777574de228ce8a5dbd484a847d0710c))

### Rename

* **Rename:** rename repo ([](https://github.com/omnixys/observability-ts/commit/63ac78845affeef331a2242efc8144c377b784ba))
* **Rename:** rename repo ([](https://github.com/omnixys/observability-ts/commit/6ff8df096f6d0855acca180d97656da5af191707))

## [3.1.0](https://github.com/omnixys/observability/compare/v3.0.0...v3.1.0) (2026-07-23)

### Observability

* **Observability:** add OTel log exporter to NodeSDK ([](https://github.com/omnixys/observability/commit/2266246cc5198c05bfc95da83581ee2f859f836e))
* **Observability:** export canonical OTLP logs ([](https://github.com/omnixys/observability/commit/16abeedf2959aa1764c8f0a7731cf9264f847986))

## [3.0.0](https://github.com/omnixys/observability/compare/v2.0.0...v3.0.0) (2026-07-15)

### Update

* **Update:** update package ([](https://github.com/omnixys/observability/commit/94bebbd1e89f73bd3f1d06231864653a1670f90f))

## [2.0.0](https://github.com/omnixys/observability/compare/v1.0.0...v2.0.0) (2026-06-23)

### Observability

* **Observability:** declare runtime peer dependencies ([](https://github.com/omnixys/observability/commit/3d1de16e9c987d15d6e1ca28833b29bf2ab5acdb))
* **Observability:** migrate P0 request context ownership ([](https://github.com/omnixys/observability/commit/dd9a5a83469d4a5f592c41deba840a8e62b3124c))
* **Observability:** build complete package artifacts ([](https://github.com/omnixys/observability/commit/fb9100a1d58e2827064aa10b843e4c4db4821640))
* **Observability:** own one metrics exporter lifecycle ([](https://github.com/omnixys/observability/commit/e9fc183fe81f98d129b1b69a7fdbbfe63ac6ba38))
* **Observability:** consume canonical log contracts ([](https://github.com/omnixys/observability/commit/bfc2b4de6b6db75a0680396869e6c559234c217c))

## 1.0.0 (2026-04-15)

### ⚠ BREAKING CHANGE

* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Other:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** removed express middleware support (fastify-only)
replaced middleware with fastify hooks
refactored tracing lifecycle (otel provider + hooks)
introduced CLS-based request context
changed span naming strategy
updated propagation system (kafka + w3c)
added adaptive sampler (sampling behavior changed)
metrics initialization refactored (no duplicate exporters)
removed legacy trace utils

NEW FEATURES:

adaptive sampling
graphql tracing
kafka propagation
correlation id system
jwt context extraction
span enrichment (userId, tenantId)
otel log events
slo + rate limit metrics
* **Observability:** - replaces previous logging and tracing setup
- services must use ObservabilityModule.forRoot(...)
- logger API changed to scoped logger via logger.child(...)
- env-based configuration removed in favor of module options

### Ci

* **Ci:** stabilize release and publish workflow with proper semantic-release detection ([](https://github.com/omnixys/observability/commit/6891b5e30d768dede776f1b8aa7d4f12567a1596))

### Index

* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/e8cdd6f1da970b6c06063ee3381e60d21ceaead6))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/ec47938c9b725e7c881196b6723174c435c3269b))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/11200ec646611b542392b40e5a26cbea3b4ee866))

### J

* **J:** u ([](https://github.com/omnixys/observability/commit/2ebc064d2464009660c872d83b80749d43f371c4))

### Logger

* **Logger:** add logger ([](https://github.com/omnixys/observability/commit/d00de09a88c3ee11ea966b8a80b2d3545bc14564))
* **Logger:** add smart structured extraction ([](https://github.com/omnixys/observability/commit/9786643471f89cf56692d78382128729c9dc282e))
* **Logger:** add log ([](https://github.com/omnixys/observability/commit/a1d07a3bf61c06d492d61bfc28a02cc536563c68))
* **Logger:** fix Logger ([](https://github.com/omnixys/observability/commit/ab06ba5c23888454be021ae97fdd4f2a4501f1e0))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/b91ec1060cba6b82cf2e42bdbd4e3c42627afa49))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/caaa819ddbe83550b9d5b432456f5c3048fac53e))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/92bc8d35712f92296d94ac453eee4b7dc8edba56))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/d742110a049368761f985a5e1b063df210ff2987))

### Observability

* **Observability:** Add Prettier + cache/kafka tracing and OTEL fixes ([](https://github.com/omnixys/observability/commit/6fb85afae36ea47b9a12e9b14230055e06df7c24))
* **Observability:** introduce unified observability module with logger, tracing and otel integration ([](https://github.com/omnixys/observability/commit/73964545b6fe51a4f29873e43438b8b904c0db0b))
* **Observability:** introduce v5 platform intelligence layer with fastify-first architecture ([](https://github.com/omnixys/observability/commit/3830e49c81a78c80a39b3106d9d18d52c64e3ba4))
* **Observability:** production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/b06c0dd39d52bc51acf69812856ef3916fae132e))
* **Observability:** release v1.0.0 – production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/95008e84a2343164c3f54da2d1a5a7727c1c34ce))
* **Observability:** fix TypeScript v6 rootDir requirement and build output structure ([](https://github.com/omnixys/observability/commit/777301e0c8eb7a40f8e77e288d7bf1d98c56728a))
* **Observability:** finalize pino logger configuration with typed transports and env handling ([](https://github.com/omnixys/observability/commit/e514c8c003ada90048f24dbb77a1da2755303d15))
* **Observability:** implement distributed tracing across Kafka with OpenTelemetry ([](https://github.com/omnixys/observability/commit/7a378d5312b0a48e80afac99fda29e8d72cfebbb))
* **Observability:** introduce hybrid logger (printf + structured logging) ([](https://github.com/omnixys/observability/commit/817376ab45d4ad922f6b7f5feed9fb1fb7ba03a5))
* **Observability:** release v1.0.0 – production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/268d139aeff08481f18f9f1d3b9399a50dcbb6b2))
* **Observability:** correct printf handling and restore structured metadata logging ([](https://github.com/omnixys/observability/commit/93efe96f93d46ef129698612996bc3238424eef1))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/4c45ee29a27d520b3ea3bb692b9d79c265bc05e2))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/45356c2a0d0f4d5876490b233ce8ec1024181207))

### Other

* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/60e1bd8cdbfaefce26def47e16f502237ad8f7d2))
* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/f47f9586c704ec9e1c0e39abaa63310f8b7c8b16))
* **Other:** fix/realese): fix release ([](https://github.com/omnixys/observability/commit/a753d601e6c3a30aea5e1bf7750ff84e8e97af24))
* **Other:** Initial commit ([](https://github.com/omnixys/observability/commit/6a0de94fd45f1eedc8b9cf43fda6da8acba7426d))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/268e7f4319219358c6750fe9c7a8724eda2c38c3))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/dd23c1a9e7493042abeeef69cb6feccb0424a890))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f73a472c44bae73f34c01aa365b041d7e258b5b6))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/09ceccaf90c841280af614473729bbda84adabe0))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f4bc803e7d1e7ad2f67230a5ac6cfa06975c98c4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/6e52d55e8fd8ff75efe2de3780daedeba649a7d4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/43e985207da4876d8989bd1c271c5c10ccf2768a))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/1ac2db63ccae377443e494475ad9d96d743ae9b9))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/df3ddd7a53b9e2e36c389e9c6cdfe44eec96f765))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/bd75c4f441f9bbd0e4011acd3955b23e815e6ef6))
* **Other:** Update package.json ([](https://github.com/omnixys/observability/commit/11ebf18cc3b8bca719c1bacd514668748efbb262))

### Package

* **Package:** update package ([](https://github.com/omnixys/observability/commit/3698ff658cd2e06ab41601e9051c4e33cbba778e))

### Propagation

* **Propagation:** add Header Carrier ([](https://github.com/omnixys/observability/commit/e8ba502931d6980d5e0af41a78127e045ecc6c23))

### Release

* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/ff5582ac4abd09b1e473655308508851bfdc7bfc))
* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/1898584746dd62a19f27142446d07953c1c0bebd))
* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/357472b6dee05966e24285587b865a1d73c23f16))
* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a13e001fa173e6d536c8272c47dd4760bf218242))
* **Release:** 1.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/c3967bcbaed4bd11238fb341d8b4da817657adb5))
* **Release:** 1.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/b00acbb75ac60b1dff7594b1e2386644f0840a64))
* **Release:** 1.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/bbd192404028a711cb7d1cc1def2b3117886daca))
* **Release:** 1.2.0 [skip ci] ([](https://github.com/omnixys/observability/commit/ed1be2955a77a17faf2d302e2e279421e4791f4f))
* **Release:** 1.3.0 [skip ci] ([](https://github.com/omnixys/observability/commit/d33177d2c14d1fd53b4817c605de7be952de425c))
* **Release:** 1.3.1 [skip ci] ([](https://github.com/omnixys/observability/commit/8accbf4b4ea6d1b7b2f6dd24dd45523ff47a7cf6))
* **Release:** 1.3.2 [skip ci] ([](https://github.com/omnixys/observability/commit/24a1838d066afa39ecdcf135fb665a8e18ac2b29))
* **Release:** 1.3.3 [skip ci] ([](https://github.com/omnixys/observability/commit/cce10fed4b432213d0f27f453016dd54b3122df3))
* **Release:** 1.4.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a1ca46640b3385b69e611175dec256e1bf1b3b46))
* **Release:** 1.4.1 [skip ci] ([](https://github.com/omnixys/observability/commit/bca12e6d063b8ab8f8cc7d08695595c7028ebe44))
* **Release:** 1.4.2 [skip ci] ([](https://github.com/omnixys/observability/commit/2e8a51051373d789a588ac7460c3c4e22ae6551a))
* **Release:** 1.4.3 [skip ci] ([](https://github.com/omnixys/observability/commit/d4adce23c491f72209e01b889d560cf224266b00))
* **Release:** 1.4.4 [skip ci] ([](https://github.com/omnixys/observability/commit/2f1b522ff108122a86bcc7b24e9d2352a0c03377))
* **Release:** 1.4.5 [skip ci] ([](https://github.com/omnixys/observability/commit/0da2b3eca4cd011c10fa6354b52cdde3c44a547e))
* **Release:** 1.5.0 [skip ci] ([](https://github.com/omnixys/observability/commit/10aef2aeb8bb446dfd57c6d0992611dde835cb9a))
* **Release:** 1.5.1 [skip ci] ([](https://github.com/omnixys/observability/commit/7e7f37446d143110fe8bd543e366c2530eb62b8f))
* **Release:** 1.6.0 [skip ci] ([](https://github.com/omnixys/observability/commit/5ec55f34d69731a6d12fe18a7c6b3c54ca4ae0a2))
* **Release:** 1.6.1 [skip ci] ([](https://github.com/omnixys/observability/commit/cf8f1958fc1622a104c1d083aaf16b7266bf8d3a))
* **Release:** 1.6.2 [skip ci] ([](https://github.com/omnixys/observability/commit/5a6bd0e9ce7c42e995133cc6808e5899f0124346))
* **Release:** 1.6.3 [skip ci] ([](https://github.com/omnixys/observability/commit/f1af3e0f05bb504c43d8b9542567d2e4c71c3685))
* **Release:** 1.6.4 [skip ci] ([](https://github.com/omnixys/observability/commit/e93cb853baafb8aca70afa60f864d80552016020))
* **Release:** 1.6.5 [skip ci] ([](https://github.com/omnixys/observability/commit/8c2eb0a000df2d5b01e2bf106ec542a11965e2d8))
* **Release:** 1.6.6 [skip ci] ([](https://github.com/omnixys/observability/commit/b0ae66cf33c9b2d589195591e731a1cfb2bd1a29))
* **Release:** 2.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/742c348a29c2d68e21179dd17710528534538356))
* **Release:** 2.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/e6498a584037cc1b9de24bb64cd02354d1a64e0b))
* **Release:** 2.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/06cbf0c6b0a6084277abd5c5c1aad8013c2c40f5))
* **Release:** 2.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/fa64a71f92f9f3985bdec79f7778a632f8cd1df5))
* **Release:** 2.1.1 [skip ci] ([](https://github.com/omnixys/observability/commit/085fa96a8d94deb0e217890345a49feda5f4dc88))
* **Release:** 2.1.2 [skip ci] ([](https://github.com/omnixys/observability/commit/1d6f896ed5daa36718be46a59b4aa0cfebb8b7d3))
* **Release:** new release ([](https://github.com/omnixys/observability/commit/91aab3fa73429c4eba3e40dbf957344f5d9a38a6))

### Tracing

* **Tracing:** create tracing context ([](https://github.com/omnixys/observability/commit/21bc6b417b44814ac4490a40e318ee5bca3236c4))
* **Tracing:** add tracing.interceptor ([](https://github.com/omnixys/observability/commit/ab57ae288032ac998e747b004bb68fc8a9e87876))
* **Tracing:** add tracing.interceptor to index.ts ([](https://github.com/omnixys/observability/commit/e33233c152f744acf0aff5e87dd9dd9ef4ae3ade))
* **Tracing:** Einführung von echtem Distributed Tracing (OpenTelemetry + Kafka) ([](https://github.com/omnixys/observability/commit/8cb60ccaa0abe4f5b28e8e760e4802143f05fb59))

### U

* **U:** u ([](https://github.com/omnixys/observability/commit/92f661911afe0fbfe74a9ea6cecfd0989afcfa38))
* **U:** u ([](https://github.com/omnixys/observability/commit/8f060db918bb43897957ea4a2e1cadbff01101c7))
* **U:** update ([](https://github.com/omnixys/observability/commit/18afda8e159e30e6925dcda00f581811abbf5082))
* **U:** update ([](https://github.com/omnixys/observability/commit/678e9cba0c7371babf68f2c24d3a620f4b123a70))
* **U:** Update batch-logger.ts ([](https://github.com/omnixys/observability/commit/a095ac7221426e4995a87ce1e79e32818cf7a6e0))

### Update

* **Update:** update ([](https://github.com/omnixys/observability/commit/2b01661ab03a3df518756999a2519e7fd3479a3a))

## 1.0.0 (2026-04-15)

### ⚠ BREAKING CHANGE

* **Other:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** removed express middleware support (fastify-only)
replaced middleware with fastify hooks
refactored tracing lifecycle (otel provider + hooks)
introduced CLS-based request context
changed span naming strategy
updated propagation system (kafka + w3c)
added adaptive sampler (sampling behavior changed)
metrics initialization refactored (no duplicate exporters)
removed legacy trace utils

NEW FEATURES:

adaptive sampling
graphql tracing
kafka propagation
correlation id system
jwt context extraction
span enrichment (userId, tenantId)
otel log events
slo + rate limit metrics
* **Observability:** - replaces previous logging and tracing setup
- services must use ObservabilityModule.forRoot(...)
- logger API changed to scoped logger via logger.child(...)
- env-based configuration removed in favor of module options

### Ci

* **Ci:** stabilize release and publish workflow with proper semantic-release detection ([](https://github.com/omnixys/observability/commit/6891b5e30d768dede776f1b8aa7d4f12567a1596))

### Index

* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/e8cdd6f1da970b6c06063ee3381e60d21ceaead6))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/ec47938c9b725e7c881196b6723174c435c3269b))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/11200ec646611b542392b40e5a26cbea3b4ee866))

### J

* **J:** u ([](https://github.com/omnixys/observability/commit/2ebc064d2464009660c872d83b80749d43f371c4))

### Logger

* **Logger:** add logger ([](https://github.com/omnixys/observability/commit/d00de09a88c3ee11ea966b8a80b2d3545bc14564))
* **Logger:** add smart structured extraction ([](https://github.com/omnixys/observability/commit/9786643471f89cf56692d78382128729c9dc282e))
* **Logger:** add log ([](https://github.com/omnixys/observability/commit/a1d07a3bf61c06d492d61bfc28a02cc536563c68))
* **Logger:** fix Logger ([](https://github.com/omnixys/observability/commit/ab06ba5c23888454be021ae97fdd4f2a4501f1e0))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/b91ec1060cba6b82cf2e42bdbd4e3c42627afa49))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/caaa819ddbe83550b9d5b432456f5c3048fac53e))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/92bc8d35712f92296d94ac453eee4b7dc8edba56))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/d742110a049368761f985a5e1b063df210ff2987))

### Observability

* **Observability:** Add Prettier + cache/kafka tracing and OTEL fixes ([](https://github.com/omnixys/observability/commit/6fb85afae36ea47b9a12e9b14230055e06df7c24))
* **Observability:** introduce unified observability module with logger, tracing and otel integration ([](https://github.com/omnixys/observability/commit/73964545b6fe51a4f29873e43438b8b904c0db0b))
* **Observability:** introduce v5 platform intelligence layer with fastify-first architecture ([](https://github.com/omnixys/observability/commit/3830e49c81a78c80a39b3106d9d18d52c64e3ba4))
* **Observability:** release v1.0.0 – production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/95008e84a2343164c3f54da2d1a5a7727c1c34ce))
* **Observability:** fix TypeScript v6 rootDir requirement and build output structure ([](https://github.com/omnixys/observability/commit/777301e0c8eb7a40f8e77e288d7bf1d98c56728a))
* **Observability:** finalize pino logger configuration with typed transports and env handling ([](https://github.com/omnixys/observability/commit/e514c8c003ada90048f24dbb77a1da2755303d15))
* **Observability:** implement distributed tracing across Kafka with OpenTelemetry ([](https://github.com/omnixys/observability/commit/7a378d5312b0a48e80afac99fda29e8d72cfebbb))
* **Observability:** introduce hybrid logger (printf + structured logging) ([](https://github.com/omnixys/observability/commit/817376ab45d4ad922f6b7f5feed9fb1fb7ba03a5))
* **Observability:** release v1.0.0 – production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/268d139aeff08481f18f9f1d3b9399a50dcbb6b2))
* **Observability:** correct printf handling and restore structured metadata logging ([](https://github.com/omnixys/observability/commit/93efe96f93d46ef129698612996bc3238424eef1))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/4c45ee29a27d520b3ea3bb692b9d79c265bc05e2))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/45356c2a0d0f4d5876490b233ce8ec1024181207))

### Other

* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/60e1bd8cdbfaefce26def47e16f502237ad8f7d2))
* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/f47f9586c704ec9e1c0e39abaa63310f8b7c8b16))
* **Other:** fix/realese): fix release ([](https://github.com/omnixys/observability/commit/a753d601e6c3a30aea5e1bf7750ff84e8e97af24))
* **Other:** Initial commit ([](https://github.com/omnixys/observability/commit/6a0de94fd45f1eedc8b9cf43fda6da8acba7426d))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/268e7f4319219358c6750fe9c7a8724eda2c38c3))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/dd23c1a9e7493042abeeef69cb6feccb0424a890))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f73a472c44bae73f34c01aa365b041d7e258b5b6))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/09ceccaf90c841280af614473729bbda84adabe0))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f4bc803e7d1e7ad2f67230a5ac6cfa06975c98c4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/6e52d55e8fd8ff75efe2de3780daedeba649a7d4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/43e985207da4876d8989bd1c271c5c10ccf2768a))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/1ac2db63ccae377443e494475ad9d96d743ae9b9))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/df3ddd7a53b9e2e36c389e9c6cdfe44eec96f765))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/bd75c4f441f9bbd0e4011acd3955b23e815e6ef6))
* **Other:** Update package.json ([](https://github.com/omnixys/observability/commit/11ebf18cc3b8bca719c1bacd514668748efbb262))

### Package

* **Package:** update package ([](https://github.com/omnixys/observability/commit/3698ff658cd2e06ab41601e9051c4e33cbba778e))

### Propagation

* **Propagation:** add Header Carrier ([](https://github.com/omnixys/observability/commit/e8ba502931d6980d5e0af41a78127e045ecc6c23))

### Release

* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/1898584746dd62a19f27142446d07953c1c0bebd))
* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/357472b6dee05966e24285587b865a1d73c23f16))
* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a13e001fa173e6d536c8272c47dd4760bf218242))
* **Release:** 1.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/c3967bcbaed4bd11238fb341d8b4da817657adb5))
* **Release:** 1.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/b00acbb75ac60b1dff7594b1e2386644f0840a64))
* **Release:** 1.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/bbd192404028a711cb7d1cc1def2b3117886daca))
* **Release:** 1.2.0 [skip ci] ([](https://github.com/omnixys/observability/commit/ed1be2955a77a17faf2d302e2e279421e4791f4f))
* **Release:** 1.3.0 [skip ci] ([](https://github.com/omnixys/observability/commit/d33177d2c14d1fd53b4817c605de7be952de425c))
* **Release:** 1.3.1 [skip ci] ([](https://github.com/omnixys/observability/commit/8accbf4b4ea6d1b7b2f6dd24dd45523ff47a7cf6))
* **Release:** 1.3.2 [skip ci] ([](https://github.com/omnixys/observability/commit/24a1838d066afa39ecdcf135fb665a8e18ac2b29))
* **Release:** 1.3.3 [skip ci] ([](https://github.com/omnixys/observability/commit/cce10fed4b432213d0f27f453016dd54b3122df3))
* **Release:** 1.4.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a1ca46640b3385b69e611175dec256e1bf1b3b46))
* **Release:** 1.4.1 [skip ci] ([](https://github.com/omnixys/observability/commit/bca12e6d063b8ab8f8cc7d08695595c7028ebe44))
* **Release:** 1.4.2 [skip ci] ([](https://github.com/omnixys/observability/commit/2e8a51051373d789a588ac7460c3c4e22ae6551a))
* **Release:** 1.4.3 [skip ci] ([](https://github.com/omnixys/observability/commit/d4adce23c491f72209e01b889d560cf224266b00))
* **Release:** 1.4.4 [skip ci] ([](https://github.com/omnixys/observability/commit/2f1b522ff108122a86bcc7b24e9d2352a0c03377))
* **Release:** 1.4.5 [skip ci] ([](https://github.com/omnixys/observability/commit/0da2b3eca4cd011c10fa6354b52cdde3c44a547e))
* **Release:** 1.5.0 [skip ci] ([](https://github.com/omnixys/observability/commit/10aef2aeb8bb446dfd57c6d0992611dde835cb9a))
* **Release:** 1.5.1 [skip ci] ([](https://github.com/omnixys/observability/commit/7e7f37446d143110fe8bd543e366c2530eb62b8f))
* **Release:** 1.6.0 [skip ci] ([](https://github.com/omnixys/observability/commit/5ec55f34d69731a6d12fe18a7c6b3c54ca4ae0a2))
* **Release:** 1.6.1 [skip ci] ([](https://github.com/omnixys/observability/commit/cf8f1958fc1622a104c1d083aaf16b7266bf8d3a))
* **Release:** 1.6.2 [skip ci] ([](https://github.com/omnixys/observability/commit/5a6bd0e9ce7c42e995133cc6808e5899f0124346))
* **Release:** 1.6.3 [skip ci] ([](https://github.com/omnixys/observability/commit/f1af3e0f05bb504c43d8b9542567d2e4c71c3685))
* **Release:** 1.6.4 [skip ci] ([](https://github.com/omnixys/observability/commit/e93cb853baafb8aca70afa60f864d80552016020))
* **Release:** 1.6.5 [skip ci] ([](https://github.com/omnixys/observability/commit/8c2eb0a000df2d5b01e2bf106ec542a11965e2d8))
* **Release:** 1.6.6 [skip ci] ([](https://github.com/omnixys/observability/commit/b0ae66cf33c9b2d589195591e731a1cfb2bd1a29))
* **Release:** 2.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/742c348a29c2d68e21179dd17710528534538356))
* **Release:** 2.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/e6498a584037cc1b9de24bb64cd02354d1a64e0b))
* **Release:** 2.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/06cbf0c6b0a6084277abd5c5c1aad8013c2c40f5))
* **Release:** 2.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/fa64a71f92f9f3985bdec79f7778a632f8cd1df5))
* **Release:** 2.1.1 [skip ci] ([](https://github.com/omnixys/observability/commit/085fa96a8d94deb0e217890345a49feda5f4dc88))
* **Release:** 2.1.2 [skip ci] ([](https://github.com/omnixys/observability/commit/1d6f896ed5daa36718be46a59b4aa0cfebb8b7d3))
* **Release:** new release ([](https://github.com/omnixys/observability/commit/91aab3fa73429c4eba3e40dbf957344f5d9a38a6))

### Tracing

* **Tracing:** create tracing context ([](https://github.com/omnixys/observability/commit/21bc6b417b44814ac4490a40e318ee5bca3236c4))
* **Tracing:** add tracing.interceptor ([](https://github.com/omnixys/observability/commit/ab57ae288032ac998e747b004bb68fc8a9e87876))
* **Tracing:** add tracing.interceptor to index.ts ([](https://github.com/omnixys/observability/commit/e33233c152f744acf0aff5e87dd9dd9ef4ae3ade))
* **Tracing:** Einführung von echtem Distributed Tracing (OpenTelemetry + Kafka) ([](https://github.com/omnixys/observability/commit/8cb60ccaa0abe4f5b28e8e760e4802143f05fb59))

### U

* **U:** u ([](https://github.com/omnixys/observability/commit/92f661911afe0fbfe74a9ea6cecfd0989afcfa38))
* **U:** u ([](https://github.com/omnixys/observability/commit/8f060db918bb43897957ea4a2e1cadbff01101c7))
* **U:** update ([](https://github.com/omnixys/observability/commit/18afda8e159e30e6925dcda00f581811abbf5082))
* **U:** update ([](https://github.com/omnixys/observability/commit/678e9cba0c7371babf68f2c24d3a620f4b123a70))
* **U:** Update batch-logger.ts ([](https://github.com/omnixys/observability/commit/a095ac7221426e4995a87ce1e79e32818cf7a6e0))

### Update

* **Update:** update ([](https://github.com/omnixys/observability/commit/2b01661ab03a3df518756999a2519e7fd3479a3a))

## 1.0.0 (2026-04-15)

### ⚠ BREAKING CHANGE

* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** removed express middleware support (fastify-only)
replaced middleware with fastify hooks
refactored tracing lifecycle (otel provider + hooks)
introduced CLS-based request context
changed span naming strategy
updated propagation system (kafka + w3c)
added adaptive sampler (sampling behavior changed)
metrics initialization refactored (no duplicate exporters)
removed legacy trace utils

NEW FEATURES:

adaptive sampling
graphql tracing
kafka propagation
correlation id system
jwt context extraction
span enrichment (userId, tenantId)
otel log events
slo + rate limit metrics
* **Observability:** - replaces previous logging and tracing setup
- services must use ObservabilityModule.forRoot(...)
- logger API changed to scoped logger via logger.child(...)
- env-based configuration removed in favor of module options

### Ci

* **Ci:** stabilize release and publish workflow with proper semantic-release detection ([](https://github.com/omnixys/observability/commit/6891b5e30d768dede776f1b8aa7d4f12567a1596))

### Index

* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/e8cdd6f1da970b6c06063ee3381e60d21ceaead6))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/ec47938c9b725e7c881196b6723174c435c3269b))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/11200ec646611b542392b40e5a26cbea3b4ee866))

### J

* **J:** u ([](https://github.com/omnixys/observability/commit/2ebc064d2464009660c872d83b80749d43f371c4))

### Logger

* **Logger:** add logger ([](https://github.com/omnixys/observability/commit/d00de09a88c3ee11ea966b8a80b2d3545bc14564))
* **Logger:** add smart structured extraction ([](https://github.com/omnixys/observability/commit/9786643471f89cf56692d78382128729c9dc282e))
* **Logger:** add log ([](https://github.com/omnixys/observability/commit/a1d07a3bf61c06d492d61bfc28a02cc536563c68))
* **Logger:** fix Logger ([](https://github.com/omnixys/observability/commit/ab06ba5c23888454be021ae97fdd4f2a4501f1e0))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/b91ec1060cba6b82cf2e42bdbd4e3c42627afa49))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/caaa819ddbe83550b9d5b432456f5c3048fac53e))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/92bc8d35712f92296d94ac453eee4b7dc8edba56))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/d742110a049368761f985a5e1b063df210ff2987))

### Observability

* **Observability:** Add Prettier + cache/kafka tracing and OTEL fixes ([](https://github.com/omnixys/observability/commit/6fb85afae36ea47b9a12e9b14230055e06df7c24))
* **Observability:** introduce unified observability module with logger, tracing and otel integration ([](https://github.com/omnixys/observability/commit/73964545b6fe51a4f29873e43438b8b904c0db0b))
* **Observability:** introduce v5 platform intelligence layer with fastify-first architecture ([](https://github.com/omnixys/observability/commit/3830e49c81a78c80a39b3106d9d18d52c64e3ba4))
* **Observability:** release v1.0.0 – production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/95008e84a2343164c3f54da2d1a5a7727c1c34ce))
* **Observability:** fix TypeScript v6 rootDir requirement and build output structure ([](https://github.com/omnixys/observability/commit/777301e0c8eb7a40f8e77e288d7bf1d98c56728a))
* **Observability:** finalize pino logger configuration with typed transports and env handling ([](https://github.com/omnixys/observability/commit/e514c8c003ada90048f24dbb77a1da2755303d15))
* **Observability:** implement distributed tracing across Kafka with OpenTelemetry ([](https://github.com/omnixys/observability/commit/7a378d5312b0a48e80afac99fda29e8d72cfebbb))
* **Observability:** introduce hybrid logger (printf + structured logging) ([](https://github.com/omnixys/observability/commit/817376ab45d4ad922f6b7f5feed9fb1fb7ba03a5))
* **Observability:** release v1.0.0 – production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/268d139aeff08481f18f9f1d3b9399a50dcbb6b2))
* **Observability:** correct printf handling and restore structured metadata logging ([](https://github.com/omnixys/observability/commit/93efe96f93d46ef129698612996bc3238424eef1))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/4c45ee29a27d520b3ea3bb692b9d79c265bc05e2))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/45356c2a0d0f4d5876490b233ce8ec1024181207))

### Other

* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/60e1bd8cdbfaefce26def47e16f502237ad8f7d2))
* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/f47f9586c704ec9e1c0e39abaa63310f8b7c8b16))
* **Other:** fix/realese): fix release ([](https://github.com/omnixys/observability/commit/a753d601e6c3a30aea5e1bf7750ff84e8e97af24))
* **Other:** Initial commit ([](https://github.com/omnixys/observability/commit/6a0de94fd45f1eedc8b9cf43fda6da8acba7426d))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/268e7f4319219358c6750fe9c7a8724eda2c38c3))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/dd23c1a9e7493042abeeef69cb6feccb0424a890))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f73a472c44bae73f34c01aa365b041d7e258b5b6))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/09ceccaf90c841280af614473729bbda84adabe0))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f4bc803e7d1e7ad2f67230a5ac6cfa06975c98c4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/6e52d55e8fd8ff75efe2de3780daedeba649a7d4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/43e985207da4876d8989bd1c271c5c10ccf2768a))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/1ac2db63ccae377443e494475ad9d96d743ae9b9))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/df3ddd7a53b9e2e36c389e9c6cdfe44eec96f765))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/bd75c4f441f9bbd0e4011acd3955b23e815e6ef6))

### Package

* **Package:** update package ([](https://github.com/omnixys/observability/commit/3698ff658cd2e06ab41601e9051c4e33cbba778e))

### Propagation

* **Propagation:** add Header Carrier ([](https://github.com/omnixys/observability/commit/e8ba502931d6980d5e0af41a78127e045ecc6c23))

### Release

* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/357472b6dee05966e24285587b865a1d73c23f16))
* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a13e001fa173e6d536c8272c47dd4760bf218242))
* **Release:** 1.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/c3967bcbaed4bd11238fb341d8b4da817657adb5))
* **Release:** 1.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/b00acbb75ac60b1dff7594b1e2386644f0840a64))
* **Release:** 1.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/bbd192404028a711cb7d1cc1def2b3117886daca))
* **Release:** 1.2.0 [skip ci] ([](https://github.com/omnixys/observability/commit/ed1be2955a77a17faf2d302e2e279421e4791f4f))
* **Release:** 1.3.0 [skip ci] ([](https://github.com/omnixys/observability/commit/d33177d2c14d1fd53b4817c605de7be952de425c))
* **Release:** 1.3.1 [skip ci] ([](https://github.com/omnixys/observability/commit/8accbf4b4ea6d1b7b2f6dd24dd45523ff47a7cf6))
* **Release:** 1.3.2 [skip ci] ([](https://github.com/omnixys/observability/commit/24a1838d066afa39ecdcf135fb665a8e18ac2b29))
* **Release:** 1.3.3 [skip ci] ([](https://github.com/omnixys/observability/commit/cce10fed4b432213d0f27f453016dd54b3122df3))
* **Release:** 1.4.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a1ca46640b3385b69e611175dec256e1bf1b3b46))
* **Release:** 1.4.1 [skip ci] ([](https://github.com/omnixys/observability/commit/bca12e6d063b8ab8f8cc7d08695595c7028ebe44))
* **Release:** 1.4.2 [skip ci] ([](https://github.com/omnixys/observability/commit/2e8a51051373d789a588ac7460c3c4e22ae6551a))
* **Release:** 1.4.3 [skip ci] ([](https://github.com/omnixys/observability/commit/d4adce23c491f72209e01b889d560cf224266b00))
* **Release:** 1.4.4 [skip ci] ([](https://github.com/omnixys/observability/commit/2f1b522ff108122a86bcc7b24e9d2352a0c03377))
* **Release:** 1.4.5 [skip ci] ([](https://github.com/omnixys/observability/commit/0da2b3eca4cd011c10fa6354b52cdde3c44a547e))
* **Release:** 1.5.0 [skip ci] ([](https://github.com/omnixys/observability/commit/10aef2aeb8bb446dfd57c6d0992611dde835cb9a))
* **Release:** 1.5.1 [skip ci] ([](https://github.com/omnixys/observability/commit/7e7f37446d143110fe8bd543e366c2530eb62b8f))
* **Release:** 1.6.0 [skip ci] ([](https://github.com/omnixys/observability/commit/5ec55f34d69731a6d12fe18a7c6b3c54ca4ae0a2))
* **Release:** 1.6.1 [skip ci] ([](https://github.com/omnixys/observability/commit/cf8f1958fc1622a104c1d083aaf16b7266bf8d3a))
* **Release:** 1.6.2 [skip ci] ([](https://github.com/omnixys/observability/commit/5a6bd0e9ce7c42e995133cc6808e5899f0124346))
* **Release:** 1.6.3 [skip ci] ([](https://github.com/omnixys/observability/commit/f1af3e0f05bb504c43d8b9542567d2e4c71c3685))
* **Release:** 1.6.4 [skip ci] ([](https://github.com/omnixys/observability/commit/e93cb853baafb8aca70afa60f864d80552016020))
* **Release:** 1.6.5 [skip ci] ([](https://github.com/omnixys/observability/commit/8c2eb0a000df2d5b01e2bf106ec542a11965e2d8))
* **Release:** 1.6.6 [skip ci] ([](https://github.com/omnixys/observability/commit/b0ae66cf33c9b2d589195591e731a1cfb2bd1a29))
* **Release:** 2.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/742c348a29c2d68e21179dd17710528534538356))
* **Release:** 2.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/e6498a584037cc1b9de24bb64cd02354d1a64e0b))
* **Release:** 2.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/06cbf0c6b0a6084277abd5c5c1aad8013c2c40f5))
* **Release:** 2.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/fa64a71f92f9f3985bdec79f7778a632f8cd1df5))
* **Release:** 2.1.1 [skip ci] ([](https://github.com/omnixys/observability/commit/085fa96a8d94deb0e217890345a49feda5f4dc88))
* **Release:** 2.1.2 [skip ci] ([](https://github.com/omnixys/observability/commit/1d6f896ed5daa36718be46a59b4aa0cfebb8b7d3))
* **Release:** new release ([](https://github.com/omnixys/observability/commit/91aab3fa73429c4eba3e40dbf957344f5d9a38a6))

### Tracing

* **Tracing:** create tracing context ([](https://github.com/omnixys/observability/commit/21bc6b417b44814ac4490a40e318ee5bca3236c4))
* **Tracing:** add tracing.interceptor ([](https://github.com/omnixys/observability/commit/ab57ae288032ac998e747b004bb68fc8a9e87876))
* **Tracing:** add tracing.interceptor to index.ts ([](https://github.com/omnixys/observability/commit/e33233c152f744acf0aff5e87dd9dd9ef4ae3ade))
* **Tracing:** Einführung von echtem Distributed Tracing (OpenTelemetry + Kafka) ([](https://github.com/omnixys/observability/commit/8cb60ccaa0abe4f5b28e8e760e4802143f05fb59))

### U

* **U:** u ([](https://github.com/omnixys/observability/commit/92f661911afe0fbfe74a9ea6cecfd0989afcfa38))
* **U:** u ([](https://github.com/omnixys/observability/commit/8f060db918bb43897957ea4a2e1cadbff01101c7))
* **U:** update ([](https://github.com/omnixys/observability/commit/18afda8e159e30e6925dcda00f581811abbf5082))
* **U:** update ([](https://github.com/omnixys/observability/commit/678e9cba0c7371babf68f2c24d3a620f4b123a70))
* **U:** Update batch-logger.ts ([](https://github.com/omnixys/observability/commit/a095ac7221426e4995a87ce1e79e32818cf7a6e0))

### Update

* **Update:** update ([](https://github.com/omnixys/observability/commit/2b01661ab03a3df518756999a2519e7fd3479a3a))

## 1.0.0 (2026-04-15)

### ⚠ BREAKING CHANGE

* **Observability:** Complete redesign of the observability layer with unified tracing, logging, and context propagation APIs.
Legacy interfaces and partial implementations have been removed.

✨ Features:
- Introduced TraceRunner for consistent span-based execution wrapping
- Full OpenTelemetry integration (traces, context propagation, exporters)
- Kafka tracing support with automatic header propagation (traceparent, baggage)
- Unified context propagation across HTTP, GraphQL, and Kafka boundaries
- AsyncLocalStorage-based request context (requestId, tenantId, actorId, metadata)
- Structured logging integration via @omnixys/logger with trace correlation
- Built-in instrumentation hooks for services, resolvers, and handlers
- Automatic span enrichment (attributes, errors, latency metrics)

⚙️ Improvements:
- Strongly typed APIs across all observability utilities
- Standardized naming conventions for spans and attributes
- Improved performance by minimizing unnecessary span creation
- Reduced boilerplate via centralized tracing utilities
- Seamless integration with existing Omnixys modules (Kafka, GraphQL, Security)

🧱 Architecture:
- Modular design with clear separation of tracing, context, and instrumentation layers
- Pluggable exporters and processors
- Fully compatible with distributed microservice environments

🛑 Removed / Changed:
- Removed legacy tracing helpers and inconsistent logging patterns
- Replaced manual context passing with automatic propagation
- Deprecated APIs removed in favor of TraceRunner and unified context access

📦 Compatibility:
- Requires Node.js >= 20
- Designed for NestJS-based distributed systems
- Fully compatible with @omnixys/kafka, @omnixys/graphql, @omnixys/security

📚 Notes:
This release marks the first stable version of the observability platform and establishes the foundation for enterprise-grade distributed tracing across all Omnixys services.
* **Observability:** removed express middleware support (fastify-only)
replaced middleware with fastify hooks
refactored tracing lifecycle (otel provider + hooks)
introduced CLS-based request context
changed span naming strategy
updated propagation system (kafka + w3c)
added adaptive sampler (sampling behavior changed)
metrics initialization refactored (no duplicate exporters)
removed legacy trace utils

NEW FEATURES:

adaptive sampling
graphql tracing
kafka propagation
correlation id system
jwt context extraction
span enrichment (userId, tenantId)
otel log events
slo + rate limit metrics
* **Observability:** - replaces previous logging and tracing setup
- services must use ObservabilityModule.forRoot(...)
- logger API changed to scoped logger via logger.child(...)
- env-based configuration removed in favor of module options

### Ci

* **Ci:** stabilize release and publish workflow with proper semantic-release detection ([](https://github.com/omnixys/observability/commit/6891b5e30d768dede776f1b8aa7d4f12567a1596))

### Index

* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/e8cdd6f1da970b6c06063ee3381e60d21ceaead6))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/ec47938c9b725e7c881196b6723174c435c3269b))
* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/11200ec646611b542392b40e5a26cbea3b4ee866))

### J

* **J:** u ([](https://github.com/omnixys/observability/commit/2ebc064d2464009660c872d83b80749d43f371c4))

### Logger

* **Logger:** add logger ([](https://github.com/omnixys/observability/commit/d00de09a88c3ee11ea966b8a80b2d3545bc14564))
* **Logger:** add smart structured extraction ([](https://github.com/omnixys/observability/commit/9786643471f89cf56692d78382128729c9dc282e))
* **Logger:** add log ([](https://github.com/omnixys/observability/commit/a1d07a3bf61c06d492d61bfc28a02cc536563c68))
* **Logger:** fix Logger ([](https://github.com/omnixys/observability/commit/ab06ba5c23888454be021ae97fdd4f2a4501f1e0))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/b91ec1060cba6b82cf2e42bdbd4e3c42627afa49))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/caaa819ddbe83550b9d5b432456f5c3048fac53e))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/92bc8d35712f92296d94ac453eee4b7dc8edba56))
* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/d742110a049368761f985a5e1b063df210ff2987))

### Observability

* **Observability:** Add Prettier + cache/kafka tracing and OTEL fixes ([](https://github.com/omnixys/observability/commit/6fb85afae36ea47b9a12e9b14230055e06df7c24))
* **Observability:** introduce unified observability module with logger, tracing and otel integration ([](https://github.com/omnixys/observability/commit/73964545b6fe51a4f29873e43438b8b904c0db0b))
* **Observability:** introduce v5 platform intelligence layer with fastify-first architecture ([](https://github.com/omnixys/observability/commit/3830e49c81a78c80a39b3106d9d18d52c64e3ba4))
* **Observability:** release v1.0.0 – production-ready tracing, logging & context propagation ([](https://github.com/omnixys/observability/commit/95008e84a2343164c3f54da2d1a5a7727c1c34ce))
* **Observability:** fix TypeScript v6 rootDir requirement and build output structure ([](https://github.com/omnixys/observability/commit/777301e0c8eb7a40f8e77e288d7bf1d98c56728a))
* **Observability:** finalize pino logger configuration with typed transports and env handling ([](https://github.com/omnixys/observability/commit/e514c8c003ada90048f24dbb77a1da2755303d15))
* **Observability:** implement distributed tracing across Kafka with OpenTelemetry ([](https://github.com/omnixys/observability/commit/7a378d5312b0a48e80afac99fda29e8d72cfebbb))
* **Observability:** introduce hybrid logger (printf + structured logging) ([](https://github.com/omnixys/observability/commit/817376ab45d4ad922f6b7f5feed9fb1fb7ba03a5))
* **Observability:** correct printf handling and restore structured metadata logging ([](https://github.com/omnixys/observability/commit/93efe96f93d46ef129698612996bc3238424eef1))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/4c45ee29a27d520b3ea3bb692b9d79c265bc05e2))
* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/45356c2a0d0f4d5876490b233ce8ec1024181207))

### Other

* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/60e1bd8cdbfaefce26def47e16f502237ad8f7d2))
* **Other:** fix(logger) add Scopped Logger ([](https://github.com/omnixys/observability/commit/f47f9586c704ec9e1c0e39abaa63310f8b7c8b16))
* **Other:** fix/realese): fix release ([](https://github.com/omnixys/observability/commit/a753d601e6c3a30aea5e1bf7750ff84e8e97af24))
* **Other:** Initial commit ([](https://github.com/omnixys/observability/commit/6a0de94fd45f1eedc8b9cf43fda6da8acba7426d))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/268e7f4319219358c6750fe9c7a8724eda2c38c3))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/dd23c1a9e7493042abeeef69cb6feccb0424a890))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f73a472c44bae73f34c01aa365b041d7e258b5b6))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/09ceccaf90c841280af614473729bbda84adabe0))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f4bc803e7d1e7ad2f67230a5ac6cfa06975c98c4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/6e52d55e8fd8ff75efe2de3780daedeba649a7d4))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/43e985207da4876d8989bd1c271c5c10ccf2768a))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/1ac2db63ccae377443e494475ad9d96d743ae9b9))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/df3ddd7a53b9e2e36c389e9c6cdfe44eec96f765))
* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/bd75c4f441f9bbd0e4011acd3955b23e815e6ef6))

### Package

* **Package:** update package ([](https://github.com/omnixys/observability/commit/3698ff658cd2e06ab41601e9051c4e33cbba778e))

### Propagation

* **Propagation:** add Header Carrier ([](https://github.com/omnixys/observability/commit/e8ba502931d6980d5e0af41a78127e045ecc6c23))

### Release

* **Release:** 1.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a13e001fa173e6d536c8272c47dd4760bf218242))
* **Release:** 1.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/c3967bcbaed4bd11238fb341d8b4da817657adb5))
* **Release:** 1.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/b00acbb75ac60b1dff7594b1e2386644f0840a64))
* **Release:** 1.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/bbd192404028a711cb7d1cc1def2b3117886daca))
* **Release:** 1.2.0 [skip ci] ([](https://github.com/omnixys/observability/commit/ed1be2955a77a17faf2d302e2e279421e4791f4f))
* **Release:** 1.3.0 [skip ci] ([](https://github.com/omnixys/observability/commit/d33177d2c14d1fd53b4817c605de7be952de425c))
* **Release:** 1.3.1 [skip ci] ([](https://github.com/omnixys/observability/commit/8accbf4b4ea6d1b7b2f6dd24dd45523ff47a7cf6))
* **Release:** 1.3.2 [skip ci] ([](https://github.com/omnixys/observability/commit/24a1838d066afa39ecdcf135fb665a8e18ac2b29))
* **Release:** 1.3.3 [skip ci] ([](https://github.com/omnixys/observability/commit/cce10fed4b432213d0f27f453016dd54b3122df3))
* **Release:** 1.4.0 [skip ci] ([](https://github.com/omnixys/observability/commit/a1ca46640b3385b69e611175dec256e1bf1b3b46))
* **Release:** 1.4.1 [skip ci] ([](https://github.com/omnixys/observability/commit/bca12e6d063b8ab8f8cc7d08695595c7028ebe44))
* **Release:** 1.4.2 [skip ci] ([](https://github.com/omnixys/observability/commit/2e8a51051373d789a588ac7460c3c4e22ae6551a))
* **Release:** 1.4.3 [skip ci] ([](https://github.com/omnixys/observability/commit/d4adce23c491f72209e01b889d560cf224266b00))
* **Release:** 1.4.4 [skip ci] ([](https://github.com/omnixys/observability/commit/2f1b522ff108122a86bcc7b24e9d2352a0c03377))
* **Release:** 1.4.5 [skip ci] ([](https://github.com/omnixys/observability/commit/0da2b3eca4cd011c10fa6354b52cdde3c44a547e))
* **Release:** 1.5.0 [skip ci] ([](https://github.com/omnixys/observability/commit/10aef2aeb8bb446dfd57c6d0992611dde835cb9a))
* **Release:** 1.5.1 [skip ci] ([](https://github.com/omnixys/observability/commit/7e7f37446d143110fe8bd543e366c2530eb62b8f))
* **Release:** 1.6.0 [skip ci] ([](https://github.com/omnixys/observability/commit/5ec55f34d69731a6d12fe18a7c6b3c54ca4ae0a2))
* **Release:** 1.6.1 [skip ci] ([](https://github.com/omnixys/observability/commit/cf8f1958fc1622a104c1d083aaf16b7266bf8d3a))
* **Release:** 1.6.2 [skip ci] ([](https://github.com/omnixys/observability/commit/5a6bd0e9ce7c42e995133cc6808e5899f0124346))
* **Release:** 1.6.3 [skip ci] ([](https://github.com/omnixys/observability/commit/f1af3e0f05bb504c43d8b9542567d2e4c71c3685))
* **Release:** 1.6.4 [skip ci] ([](https://github.com/omnixys/observability/commit/e93cb853baafb8aca70afa60f864d80552016020))
* **Release:** 1.6.5 [skip ci] ([](https://github.com/omnixys/observability/commit/8c2eb0a000df2d5b01e2bf106ec542a11965e2d8))
* **Release:** 1.6.6 [skip ci] ([](https://github.com/omnixys/observability/commit/b0ae66cf33c9b2d589195591e731a1cfb2bd1a29))
* **Release:** 2.0.0 [skip ci] ([](https://github.com/omnixys/observability/commit/742c348a29c2d68e21179dd17710528534538356))
* **Release:** 2.0.1 [skip ci] ([](https://github.com/omnixys/observability/commit/e6498a584037cc1b9de24bb64cd02354d1a64e0b))
* **Release:** 2.0.2 [skip ci] ([](https://github.com/omnixys/observability/commit/06cbf0c6b0a6084277abd5c5c1aad8013c2c40f5))
* **Release:** 2.1.0 [skip ci] ([](https://github.com/omnixys/observability/commit/fa64a71f92f9f3985bdec79f7778a632f8cd1df5))
* **Release:** 2.1.1 [skip ci] ([](https://github.com/omnixys/observability/commit/085fa96a8d94deb0e217890345a49feda5f4dc88))
* **Release:** 2.1.2 [skip ci] ([](https://github.com/omnixys/observability/commit/1d6f896ed5daa36718be46a59b4aa0cfebb8b7d3))
* **Release:** new release ([](https://github.com/omnixys/observability/commit/91aab3fa73429c4eba3e40dbf957344f5d9a38a6))

### Tracing

* **Tracing:** create tracing context ([](https://github.com/omnixys/observability/commit/21bc6b417b44814ac4490a40e318ee5bca3236c4))
* **Tracing:** add tracing.interceptor ([](https://github.com/omnixys/observability/commit/ab57ae288032ac998e747b004bb68fc8a9e87876))
* **Tracing:** add tracing.interceptor to index.ts ([](https://github.com/omnixys/observability/commit/e33233c152f744acf0aff5e87dd9dd9ef4ae3ade))
* **Tracing:** Einführung von echtem Distributed Tracing (OpenTelemetry + Kafka) ([](https://github.com/omnixys/observability/commit/8cb60ccaa0abe4f5b28e8e760e4802143f05fb59))

### U

* **U:** u ([](https://github.com/omnixys/observability/commit/92f661911afe0fbfe74a9ea6cecfd0989afcfa38))
* **U:** u ([](https://github.com/omnixys/observability/commit/8f060db918bb43897957ea4a2e1cadbff01101c7))
* **U:** update ([](https://github.com/omnixys/observability/commit/18afda8e159e30e6925dcda00f581811abbf5082))
* **U:** update ([](https://github.com/omnixys/observability/commit/678e9cba0c7371babf68f2c24d3a620f4b123a70))
* **U:** Update batch-logger.ts ([](https://github.com/omnixys/observability/commit/a095ac7221426e4995a87ce1e79e32818cf7a6e0))

### Update

* **Update:** update ([](https://github.com/omnixys/observability/commit/2b01661ab03a3df518756999a2519e7fd3479a3a))

## [2.1.2](https://github.com/omnixys/observability/compare/v2.1.1...v2.1.2) (2026-03-24)

### Observability

* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/4c45ee29a27d520b3ea3bb692b9d79c265bc05e2))

## [2.1.1](https://github.com/omnixys/observability/compare/v2.1.0...v2.1.1) (2026-03-24)

### Observability

* **Observability:** resolve NestJS DI failure caused by type-only import ([](https://github.com/omnixys/observability/commit/45356c2a0d0f4d5876490b233ce8ec1024181207))

## [2.1.0](https://github.com/omnixys/observability/compare/v2.0.2...v2.1.0) (2026-03-23)

### Propagation

* **Propagation:** add Header Carrier ([](https://github.com/omnixys/observability/commit/e8ba502931d6980d5e0af41a78127e045ecc6c23))

## [2.0.2](https://github.com/omnixys/observability/compare/v2.0.1...v2.0.2) (2026-03-23)

### Index

* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/e8cdd6f1da970b6c06063ee3381e60d21ceaead6))

## [2.0.1](https://github.com/omnixys/observability/compare/v2.0.0...v2.0.1) (2026-03-23)

### Index

* **Index:** update index.ts ([](https://github.com/omnixys/observability/commit/ec47938c9b725e7c881196b6723174c435c3269b))

## [2.0.0](https://github.com/omnixys/observability/compare/v1.6.6...v2.0.0) (2026-03-22)

### ⚠ BREAKING CHANGE

* **Observability:** removed express middleware support (fastify-only)
replaced middleware with fastify hooks
refactored tracing lifecycle (otel provider + hooks)
introduced CLS-based request context
changed span naming strategy
updated propagation system (kafka + w3c)
added adaptive sampler (sampling behavior changed)
metrics initialization refactored (no duplicate exporters)
removed legacy trace utils

NEW FEATURES:

adaptive sampling
graphql tracing
kafka propagation
correlation id system
jwt context extraction
span enrichment (userId, tenantId)
otel log events
slo + rate limit metrics

### Ci

* **Ci:** stabilize release and publish workflow with proper semantic-release detection ([](https://github.com/omnixys/observability/commit/6891b5e30d768dede776f1b8aa7d4f12567a1596))

### Observability

* **Observability:** introduce v5 platform intelligence layer with fastify-first architecture ([](https://github.com/omnixys/observability/commit/3830e49c81a78c80a39b3106d9d18d52c64e3ba4))
* **Observability:** fix TypeScript v6 rootDir requirement and build output structure ([](https://github.com/omnixys/observability/commit/777301e0c8eb7a40f8e77e288d7bf1d98c56728a))

## [1.6.6](https://github.com/omnixys/observability/compare/v1.6.5...v1.6.6) (2026-03-18)

### U

* **U:** u ([](https://github.com/omnixys/observability/commit/92f661911afe0fbfe74a9ea6cecfd0989afcfa38))

## [1.6.5](https://github.com/omnixys/observability/compare/v1.6.4...v1.6.5) (2026-03-18)

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/268e7f4319219358c6750fe9c7a8724eda2c38c3))

### U

* **U:** Update batch-logger.ts ([](https://github.com/omnixys/observability/commit/a095ac7221426e4995a87ce1e79e32818cf7a6e0))

## [1.6.4](https://github.com/omnixys/observability/compare/v1.6.3...v1.6.4) (2026-03-18)

### J

* **J:** u ([](https://github.com/omnixys/observability/commit/2ebc064d2464009660c872d83b80749d43f371c4))

## [1.6.3](https://github.com/omnixys/observability/compare/v1.6.2...v1.6.3) (2026-03-18)

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/dd23c1a9e7493042abeeef69cb6feccb0424a890))

### U

* **U:** u ([](https://github.com/omnixys/observability/commit/8f060db918bb43897957ea4a2e1cadbff01101c7))

## [1.6.2](https://github.com/omnixys/observability/compare/v1.6.1...v1.6.2) (2026-03-18)

### U

* **U:** update ([](https://github.com/omnixys/observability/commit/18afda8e159e30e6925dcda00f581811abbf5082))

## [1.6.1](https://github.com/omnixys/observability/compare/v1.6.0...v1.6.1) (2026-03-18)

### Update

* **Update:** update ([](https://github.com/omnixys/observability/commit/2b01661ab03a3df518756999a2519e7fd3479a3a))

## [1.6.0](https://github.com/omnixys/observability/compare/v1.5.1...v1.6.0) (2026-03-18)

### Observability

* **Observability:** implement distributed tracing across Kafka with OpenTelemetry ([](https://github.com/omnixys/observability/commit/7a378d5312b0a48e80afac99fda29e8d72cfebbb))

### Tracing

* **Tracing:** Einführung von echtem Distributed Tracing (OpenTelemetry + Kafka) ([](https://github.com/omnixys/observability/commit/8cb60ccaa0abe4f5b28e8e760e4802143f05fb59))

## [1.5.1](https://github.com/omnixys/observability/compare/v1.5.0...v1.5.1) (2026-03-18)

### Observability

* **Observability:** correct printf handling and restore structured metadata logging ([](https://github.com/omnixys/observability/commit/93efe96f93d46ef129698612996bc3238424eef1))

## [1.5.0](https://github.com/omnixys/observability/compare/v1.4.5...v1.5.0) (2026-03-18)

### Logger

* **Logger:** add smart structured extraction ([](https://github.com/omnixys/observability/commit/9786643471f89cf56692d78382128729c9dc282e))
* **Logger:** fix Logger ([](https://github.com/omnixys/observability/commit/ab06ba5c23888454be021ae97fdd4f2a4501f1e0))

### Observability

* **Observability:** introduce hybrid logger (printf + structured logging) ([](https://github.com/omnixys/observability/commit/817376ab45d4ad922f6b7f5feed9fb1fb7ba03a5))

## [1.4.5](https://github.com/omnixys/observability/compare/v1.4.4...v1.4.5) (2026-03-18)

### Logger

* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/b91ec1060cba6b82cf2e42bdbd4e3c42627afa49))

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f73a472c44bae73f34c01aa365b041d7e258b5b6))

## [1.4.4](https://github.com/omnixys/observability/compare/v1.4.3...v1.4.4) (2026-03-18)

### Logger

* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/caaa819ddbe83550b9d5b432456f5c3048fac53e))

## [1.4.3](https://github.com/omnixys/observability/compare/v1.4.2...v1.4.3) (2026-03-18)

### Logger

* **Logger:** add log ([](https://github.com/omnixys/observability/commit/a1d07a3bf61c06d492d61bfc28a02cc536563c68))

## [1.4.2](https://github.com/omnixys/observability/compare/v1.4.1...v1.4.2) (2026-03-18)

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/09ceccaf90c841280af614473729bbda84adabe0))

### U

* **U:** update ([](https://github.com/omnixys/observability/commit/678e9cba0c7371babf68f2c24d3a620f4b123a70))

## [1.4.1](https://github.com/omnixys/observability/compare/v1.4.0...v1.4.1) (2026-03-18)

### Logger

* **Logger:** update logger ([](https://github.com/omnixys/observability/commit/92bc8d35712f92296d94ac453eee4b7dc8edba56))

### Other

* **Other:** Merge branch 'main' of https://github.com/omnixys/observability ([](https://github.com/omnixys/observability/commit/f4bc803e7d1e7ad2f67230a5ac6cfa06975c98c4))

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
