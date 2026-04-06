export class SpanNaming {
  static http(method: string, route: string) {
    return `${method.toUpperCase()} ${route}`;
  }

  static graphql(type: string, field: string) {
    return `GraphQL ${type}.${field}`;
  }

  static kafka(topic: string, operation: 'publish' | 'consume') {
    return `Kafka ${operation.toUpperCase()} ${topic}`;
  }

  static service(operation: string) {
    return `Service ${operation}`;
  }
}
