DROP TABLE IF EXISTS events;

SET timezone = 'Asia/Calcutta';

CREATE TABLE events(
    "id" VARCHAR(500) PRIMARY KEY,
    "eventName" VARCHAR(500) NOT NULL,
    "addedBy" VARCHAR(500) NOT NULL,
    "eventStartDate" DATE NOT NULL DEFAULT CURRENT_DATE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL
);



