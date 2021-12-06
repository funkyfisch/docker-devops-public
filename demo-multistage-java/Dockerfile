FROM maven:3.8.4-eclipse-temurin-17 as base

WORKDIR /app

COPY pom.xml .

RUN mvn -B org.apache.maven.plugins:maven-dependency-plugin:3.1.2:go-offline

COPY src ./src

# docker build -t javamultistage-test --target test .
FROM base as test
RUN mvn -B test

# docker build -t javamultistage-build --target build .
FROM base as build

RUN mvn -B package

# docker build -t javamultistage-prod --target production .
FROM openjdk:11-jre as production

# excludes everything from the 'build' stage except for the JAR file.
COPY --from=build /app/target/javamultistage-*.jar /javamultistage.jar
CMD ["java", "-jar", "/javamultistage.jar"]
