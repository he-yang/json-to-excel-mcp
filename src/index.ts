#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { processDataJ2E, processURLJ2E, URLs  } from './functions.js'


const server = new McpServer({
	name: "JSON to Excel MCP by WTSolutions",
	version: "0.3.0",
});

server.registerTool(
	"json_to_excel_mcp_from_url",
	{
		title: "JSON to Excel MCP by WTSolutions - from url",
		description: "Convert JSON data from publicly accessible URL(.json format) to CSV data. If you do not have a Pro Code, please pass only the url parameter, and do not pass the options parameter.",
		inputSchema: {
			url: z.string().nonempty().describe("Publicly accessible URL of the JSON file"),
			options: z.object({
				jsonMode: z.enum(['nested', 'flat']).optional().describe("Format mode for JSON output: “nested”, or “flat”"),
				delimiter: z.enum(['.', '_', '__', '/']).optional().describe("Delimiter character for nested JSON keys when using jsonMode: “nested”, acceptable delimiters are “.”, “_”, “__”, “/”."),
				maxDepth: z.enum(['unlimited', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']).optional().describe("Maximum depth for nested JSON objects when using jsonMode: “nested”. For maxDepth, “unlimited”, “1” ~ “20” acceptable."),
				proCode: z.string().optional().describe("Pro Code for JSON to Excel MCP by WTSolutions. If you do not have a Pro Code, please do not pass this parameter."),
			}).optional().describe("If you do not have a Pro Code, please do not pass the options parameter in the request."),
		}
	},
	async ({ url, options }) => {
		if (options && !options.proCode) {
            options.proCode = process.env.proCode || ''
        }
		let result = await processURLJ2E(url, options)
		if (result.isError) {
			result['data'] = ''
			result['msg'] = result['msg'] + ' ||| Refer to Documentation at  ' + URLs.mcpJ2E
		} else {
			result['msg'] = 'success'
		}
		return { content: [{ type: "text", text: JSON.stringify(result) }] };
	}
);

server.registerTool(
	"json_to_excel_mcp_from_data",
	{
		title: "JSON to Excel MCP by WTSolutions - from data",
		description: "Convert JSON data to CSV data. If you do not have a Pro Code, please pass only the data parameter, and do not pass the options parameter.",
		inputSchema: {
			data: z.string().nonempty().describe("JSON data to be converted to CSV"),
			options: z.object({
				jsonMode: z.enum(['nested', 'flat']).optional().describe("Format mode for JSON output: “nested”, or “flat”"),
				delimiter: z.enum(['.', '_', '__', '/']).optional().describe("Delimiter character for nested JSON keys when using jsonMode: “nested”, acceptable delimiters are “.”, “_”, “__”, “/”."),
				maxDepth: z.enum(['unlimited', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']).optional().describe("Maximum depth for nested JSON objects when using jsonMode: “nested”. For maxDepth, “unlimited”, “1” ~ “20” acceptable."),
				proCode: z.string().optional().describe("Pro Code for JSON to Excel MCP by WTSolutions. If you do not have a Pro Code, please do not pass this parameter."),
			}).optional().describe("If you do not have a Pro Code, please do not pass the options parameter in the request."),
		}
	},

	async ({ data, options }) => {
		if (options && !options.proCode) {
            options.proCode = process.env.proCode || ''
        }
		let result = await processDataJ2E(data, options)
		if (result.isError) {
			result['data'] = ''
			result['msg'] = result['msg'] + ' ||| Refer to Documentation at  ' + URLs.mcpJ2E
		} else {
			result['msg'] = 'success'
		}
		return { content: [{ type: "text", text: JSON.stringify(result) }] };
	}
);

server.registerPrompt(
	"from-url",
	{
		title: "Convert JSON file(URL) to CSV data",
		description: "Convert JSON file to CSV data, the JSON file URL is publically avaliable. URL should point to .json file and start with https.",
		argsSchema: { url: z.string() }
	},
	({ url }) => ({
		messages: [{
			role: "user",
			content: {
				type: "text",
				text: `Please convert JSON to CSV data, and the JSON file is located at URL: ${url} \n\n I do not have a pro code, so please do not pass options parameter in the request.`
			}
		}]
	})
);

server.registerPrompt(
	"from-url-upload",
	{
		title: "Convert JSON file(uploaded) to CSV data",
		description: "Convert JSON file to CSV data, the JSON file is uploaded to AI model",
		argsSchema: {}
	},
	() => ({
		messages: [{
			role: "user",
			content: {
				type: "text",
				text: `I've just uploaded one .json file to you, please extract its URL and send it to MCP tool 'json_to_excel_mcp_from_url', for JSON to CSV conversion. \n\n I do not have a pro code, so please do not pass options parameter in the request.`
			}
		}]
	})
);

server.registerPrompt(
	"from-data",
	{
		title: "Convert JSON data to CSV data",
		description: "Convert JSON data to CSV data",
		argsSchema: { data: z.string() }
	},
	({ data }) => ({
		messages: [{
			role: "user",
			content: {
				type: "text",
				text: `Convert the following JSON data into CSV format: \n\n ${data} \n\n I do not have a pro code, so please do not pass options parameter in the request.`
			}
		}]
	})
);


async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("JSON to Excel MCP by WTSolutions Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
