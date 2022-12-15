// import required libraries
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, errors, json } = format;

// create logger function
const productionLogger = () => {
    return createLogger({
        level: "info",
        format: combine(timestamp(), errors({ stack: true }), json()),
        defaultMeta: { service: "user-service" },
        transports: [
            //
            // - Write all logs with importance level of `error` or less to `error.log`
            // - Write all logs with importance level of `info` or less to `combined.log`
            //
            new transports.File({ filename: "error.log" }),
            new transports.File({ filename: "combined.log" }),
        ],
    });
};

// export developmentLogger
module.exports = productionLogger;
