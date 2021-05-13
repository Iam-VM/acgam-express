DROP TABLE IF EXISTS certs;


CREATE TABLE certs(
    "id" VARCHAR(500) NOT NULL PRIMARY KEY,
    "eventId" VARCHAR(500) NOT NULL,
    "recipientName" VARCHAR(500) NOT NULL,
    "recipientEmail" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ
);
