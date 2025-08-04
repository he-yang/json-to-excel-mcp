# JSON to Excel MCP by WTSolutions

[中文](README-zh.md)

## Introduction

The **JSON to Excel MCP** (Model Context Protocol) provides a standardized interface for converting JSON data into CSV format string using the Model Context Protocol. This MCP implementation offers two specific tools for data conversion:

- **json_to_excel_mcp_from_data**: Converts JSON data string into CSV format.
- **json_to_excel_mcp_from_url**: Converts JSON file from a provided URL (.json format) into CSV format string.

JSON to Excel MCP is part of JSON to Excel toolkit by WTSolutions:
* [JSON to Excel Web App: Convert JSON to Excel directly in Web Browser.](https://json-to-excel.wtsolutions.cn/en/latest/WebApp.html)
* [JSON to Excel Excel Add-in: Convert JSON to Excel in Excel, works with Excel environment seamlessly.](https://json-to-excel.wtsolutions.cn/en/latest/ExcelAddIn.html)
* [JSON to Excel API: Convert JSON to Excel by HTTPS POST request.](https://json-to-excel.wtsolutions.cn/en/latest/API.html)
* <mark>JSON to Excel MCP Service: Convert JSON to Excel by AI Model MCP SSE/StreamableHTTP request.</mark> (<-- You are here.)

## Server Config

Available MCP Servers (SSE and Streamable HTTP):

## Using Stdio (NPX)


Server Config JSON:

```json
{
  "mcpServers": {
    "json_to_excel": {
      "args": [
        "mcp-remote",
        "https://mcp2.wtsolutions.cn/sse",
        "--transport",
        "sse-only"
      ],
      "command": "npx"
    }
  }
}
```

### Using SSE

Transport: SSE

URL: https://mcp2.wtsolutions.cn/sse

Server Config JSON:

```json
{
  "mcpServers": {
    "json2excelsse": {
      "type": "sse",
      "url": "https://mcp2.wtsolutions.cn/sse"
    }
  }
}

```
### Using Streamable HTTP

Transport: Streamable HTTP

URL: https://mcp2.wtsolutions.cn/mcp

Server Config JSON:

```json
{
  "mcpServers": {
    "json2excelmcp": {
      "type": "streamableHttp",
      "url": "https://mcp2.wtsolutions.cn/mcp"
    }
  }
}
```

## MCP Tools

### json_to_excel_mcp_from_data

Converts JSON data string into CSV format string.

#### Parameters

| Parameter | Type   | Required | Description                                                                 |
|-----------|--------|----------|-----------------------------------------------------------------------------|
| data      | string | Yes      | JSON data string to be converted to CSV. Must be a valid JSON array or object. |

> Note:
> - Input data must be a valid JSON string. JSON schema available at [JSON Schema](https://json-to-excel.wtsolutions.cn/en/latest/profeatures.html#acceptable-json-format) and validator available at [JSON to Excel Web App](https://s.wtsolutions.cn/json-to-excel.html).
> - If the JSON is an array of objects, each object will be treated as a row in the CSV.
> - If the JSON is a single object, it will be converted into a CSV with key-value pairs.
> - The CSV will include headers based on the keys in the JSON objects.
> - This tool returns CSV-formatted data that can be easily converted/imported to Excel.

#### Example Prompt 1:

Convert the following JSON data into CSV format:

```json
[
  {"Name": "John Doe", "Age": 25, "IsStudent": false},
  {"Name": "Jane Smith", "Age": 30, "IsStudent": true}
]
```

#### Example Prompt 2:

Convert the following JSON object into CSV format:

```json
{
  "Name": "John Doe",
  "Age": 25,
  "IsStudent": false,
  "Courses": ["Math", "Science"]
}
```

### json_to_excel_mcp_from_url

Converts JSON data from a provided URL into Excel data.

#### Parameters

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| url       | string | Yes      | URL pointing to a JSON file (.json)              |

> Note:
> - The url should be publicly accessible.
> - The JSON file should be in .json format.
> - The JSON file should contain a valid JSON array or object. JSON schema available at [JSON Schema](https://json-to-excel.wtsolutions.cn/en/latest/profeatures.html#acceptable-json-format) and validator available at [JSON to Excel Web App](https://s.wtsolutions.cn/json-to-excel.html).
> - If the JSON is an array of objects, each object will be treated as a row in the CSV.
> - If the JSON is a single object, it will be converted into a CSV with key-value pairs.
> - This tool returns CSV-formatted data that can be easily converted/imported to Excel.

### Example Prompt 1

Convert JSON file to Excel, file URL: https://mcp.wtsolutions.cn/example.json

### Example Prompt 2
(applicable only when you do not have a URL and working with online AI LLM)

I've just uploaded one .json file to you, please extract its URL and send it to MCP tool 'json_to_excel_mcp_from_url', for JSON to Excel conversion.


## Response Format

The MCP tools return a JSON object with the following structure:

| Field    | Type    | Description                                                                                                                               |
|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------|
| isError  | boolean | Indicates if there was an error processing the request                                                                                    |
| msg      | string  | 'success' or error description                                                                                                            |
| data     | string  | Converted CSV data string, '' if there was an error. This CSV data can be easily imported into Excel.                                      |

### Example Success Response

```json
{
  "content": [{
    "type": "text",
    "text": "{\"isError\":false,\"msg\":\"success\",\"data\":\"Name,Age,IsStudent\nJohn Doe,25,false\nJane Smith,30,true\"}"
  }]
}
```

Above is the response from MCP tool, and in most cases your LLM should interpret the response and present you with a JSON object, for example as below.
> Note, different LLM models may have different ways to interpret the JSON object, so please check if the JSON object is correctly interpreted by your LLM model.


```json
{
  "isError": false,
  "msg": "success",
  "data": "Name,Age,IsStudent\nJohn Doe,25,false\nJane Smith,30,true"
}
```

### Example Failed Response

```json
{
  "content": [{
    "type": "text",
    "text": "{\"isError\": true, \"msg\": \"Invalid JSON format\", \"data\": \"\"}"
  }]
}
```
Above is the response from MCP tool, and in most cases your LLM should interpret the response and present you with a JSON object, for example as below.
> Note, different LLM models may have different ways to interpret the JSON object, so please check if the response is correctly interpreted by your LLM model.

```json
{
  "isError": true,
  "msg": "Invalid JSON format",
  "data": ""
}
```
or it is also possible that your LLM would say "Invalid JSON format, please provide a valid JSON string" to you.

## Data Type Handling

The API automatically handles different data types in JSON:

- **Numbers**: Converted to numeric values in CSV
- **Booleans**: Converted to 'true'/'false' strings
- **Strings**: Escaped and quoted if necessary
- **Arrays**: Converted to JSON.stringify array string
- **Objects**: Converted to JSON.stringify object string

## Error Handling

The MCP returns descriptive error messages for common issues:

- `Invalid JSON format`: When input data is not a valid JSON string
- `Empty JSON data`: When input data is an empty JSON string
- `Network Error when fetching file`: When there's an error downloading the file from the provided URL
- `File not found`: When the file at the provided URL cannot be found
- `Server Internal Error`: When an unexpected error occurs

## Service Agreement and Privacy Policy

By using JSON to Excel MCP, you agree to the [service agreement](TERMS.md), and [privacy policy](PRIVACY.md).


## Pricing

Free for now.

## Donation

[https://buymeacoffee.com/wtsolutions](https://buymeacoffee.com/wtsolutions)
