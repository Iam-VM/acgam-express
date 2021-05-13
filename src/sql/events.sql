DROP TABLE IF EXISTS events;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET timezone = 'Asia/Calcutta';

CREATE TABLE events(
    "id" UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "eventName" VARCHAR(500) NOT NULL,
    "addedBy" VARCHAR(500) NOT NULL,
    "eventStartDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL
);



