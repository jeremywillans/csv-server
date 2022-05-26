# csv-server

Designed as a Web App for receiving HTTP POST JSON Objects from RoomOS Devices and writing them to a CSV File

Built as a companion server to [Customer Satisfaction Macro](https://github.com/jeremywillans/roomos-macros/tree/main/CustomerSatisfaction)

## Example Deployment

1. Install Docker and Docker Compose
2. Download and Build the image using the following command (executed from the extracted source directory)
   `docker build --tag csv-server .`
3. Create a new directory with the following file `docker-compose.yml` and a sub-directory called `output`
```
version: "3"

services:
  csv-server:
    image: csv-server:latest
    container_name: csv-server
    environment:
      - CONSOLE_LEVEL=debug
      - SIGNATURE=supersecret123
    ports:
      - "3000:3000"
    volumes:
      - "./output:/output"
    networks:
      - internal
networks:
  internal:
```
4. Start the container `docker-compose up -d`
5. Confirm logs from container using `docker logs csv-server`

### Environmental Variables

These variables can be individually defined in Docker, or loaded as an `.env` file in the `/app` directory.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| PORT | **Required** | `3000` | Container Internal Port
| SIGNATURE | **Required** | `supersecret123` | Expected Value from Authorization Header
| CONSOLE_LEVEL | **Optional** | `info` | Console Level
| FILE_NAME | **Optional** | `output/data.csv` | CSV Output File Path
| HEADERS | **Optional** | `system,serial,software,rating,destination,duration,duration_fmt,cause,issue,feedback,reporter` | CSV Headers matching JSON Data

## Support

In case you've found a bug, please [open an issue on GitHub](../../issues).

## Disclaimer

This software is NOT guaranteed to be bug free and production quality.
