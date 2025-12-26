# JSON 转 Excel MCP 由 WTSolutions 提供

[English](README.md)

## 介绍

**JSON 转 Excel MCP**（模型上下文协议）提供了一个标准化接口，用于使用模型上下文协议将 JSON 数据转换为 CSV 格式字符串。此 MCP 实现提供了两个特定的数据转换工具：

- **json_to_excel_mcp_from_data**：将 JSON 数据字符串转换为 CSV 格式。
- **json_to_excel_mcp_from_url**：将提供的 URL 中的 JSON 文件（.json 格式）转换为 CSV 格式字符串。

JSON 转 Excel MCP 是 WTSolutions 的 JSON 转 Excel 工具包的一部分：
* [JSON 转 Excel Web 应用：直接在网页浏览器中转换 JSON 到 Excel。](https://json-to-excel.wtsolutions.cn/zh-cn/latest/WebApp.html)
* [JSON 转 Excel Excel 插件：在 Excel 中转换 JSON 到 Excel，与 Excel 环境无缝协作。](https://json-to-excel.wtsolutions.cn/zh-cn/latest/ExcelAddIn.html)
* [JSON 转 Excel WPS 插件：在 WPS 中转换 JSON 到 Excel，与 WPS 环境无缝协作。](https://json-to-excel.wtsolutions.cn/zh-cn/latest/WPSAddIn.html)
* [JSON 转 Excel API：通过 HTTPS POST 请求转换 JSON 到 Excel。](https://json-to-excel.wtsolutions.cn/zh-cn/latest/API.html)
* <mark>JSON 转 Excel MCP 服务：通过 AI 模型 MCP SSE/StreamableHTTP 请求转换 JSON 到 Excel。</mark>（<- 您当前所在位置。）

## 服务器配置

可用的 MCP 服务器（SSE 和 Streamable HTTP）：


## 使用Stdio (NPX)


服务器配置 JSON:

Case 1 : 免费版

如果您使用的是免费版本：

```json
{
  "mcpServers": {
    "json-to-excel-mcp": {
      "args": [
        "json-to-excel-mcp"        
      ],
      "command": "npx"
    }
  }
}
```

Case 2 : Pro版本

如果您使用的是Pro版本（需要有有效Pro Code）：

```json
{
  "mcpServers": {
    "json-to-excel-mcp": {
      "args": [
        "json-to-excel-mcp"        
      ],
      "command": "npx",
      "env": {
        "proCode": "type in your proCode here"
      }
    }
  }
}
```

### 使用 SSE
从v0.3.0开始，不再支持SSE。

### 使用 Streamable HTTP
从v0.3.0开始，不再支持Streamable HTTP。


## MCP 工具

### json_to_excel_mcp_from_data

将 JSON 数据字符串转换为 CSV 格式字符串。

#### 参数

| 参数 | 类型 | 是否必需 | 描述 |
|---------|--------|----------|-------------|
| data | string | 是 | 要转换为 CSV 的 JSON 数据字符串。必须是有效的 JSON 数组或对象。 |
| options | object | 否 | 用于自定义转换过程的可选配置对象。需要有效的 JSON 转 Excel 服务订阅。 |

> 注意：
> - 输入数据必须是有效的 JSON 字符串。JSON格式要求可在 [JSON格式要求](https://json-to-excel.wtsolutions.cn/zh-cn/latest/profeatures.html#id4) 获取，验证器可在 [JSON 转 Excel Web 应用](https://s.wtsolutions.cn/json-to-excel.html) 使用。
> - 如果 JSON 是对象数组，每个对象将被视为 CSV 中的一行。
> - 如果 JSON 是单个对象，它将被转换为包含键值对的 CSV。
> - CSV 将包含基于 JSON 对象中键的标题。
> - 此工具返回可轻松转换/导入到 Excel 的 CSV 格式数据。

#### 选项对象

options 对象可以包含以下属性：

| 属性 | 类型 | 默认值 | 描述 |
|----------|-------|--------|-------------|
| proCode | string | "" | 自定义转换规则的 Pro 代码，需要有效的 JSON 转 Excel 服务订阅。如果提供了 options，则此为必填项。 |
| jsonMode | string | "flat" | JSON 输出的格式模式："nested"（嵌套）或 "flat"（扁平） |
| delimiter | string | "." | 使用 jsonMode: "nested" 时嵌套 JSON 键的分隔符，可接受的分隔符为 "."、"_"、"__"、"/"。 |
| maxDepth | string | "unlimited" | 使用 jsonMode: "nested" 时嵌套 JSON 对象的最大深度。maxDepth 可接受的值为 "unlimited"、"1" ~ "20"。 |

注意：
> - 如果提供了 options，则 proCode 是必填项。如果您没有有效的 [Pro 代码](https://json-to-excel.wtsolutions.cn/zh-cn/latest/pricing.html)，请使用不带 options 参数的免费版本，默认转换规则将被应用。
> - 详细的转换规则可在 [Pro 功能](https://json-to-excel.wtsolutions.cn/zh-cn/latest/profeatures.html) 中找到。

#### 示例提示 1：

将以下 JSON 数据转换为 CSV 格式：

```json
[
  {"Name": "张三", "Age": 25, "IsStudent": false},
  {"Name": "李四", "Age": 30, "IsStudent": true}
]
```

#### 示例提示 2：

将以下 JSON 对象转换为 CSV 格式：

```json
{
  "Name": "张三",
  "Age": 25,
  "IsStudent": false,
  "Courses": ["数学", "科学"]
}
```

### json_to_excel_mcp_from_url

将提供的 URL 中的 JSON 数据转换为 Excel 数据。

#### 参数

| 参数 | 类型 | 是否必需 | 描述 |
|---------|--------|----------|-------------|
| url | string | 是 | 指向 JSON 文件（.json）的 URL |
| options | object | 否 | 用于自定义转换过程的可选配置对象。需要有效的 JSON 转 Excel 服务订阅。 |

> 注意：
> - URL 应该是可公开访问的。
> - JSON 文件应该是 .json 格式。
> - JSON 文件应该包含有效的 JSON 数组或对象。JSON格式要求可在 [JSON格式要求](https://json-to-excel.wtsolutions.cn/zh-cn/latest/profeatures.html#id4) 获取，验证器可在 [JSON 转 Excel Web 应用](https://s.wtsolutions.cn/json-to-excel.html) 获取。
> - 如果 JSON 是对象数组，每个对象将被视为 CSV 中的一行。
> - 如果 JSON 是单个对象，它将被转换为包含键值对的 CSV。
> - 此工具返回可轻松转换/导入到 Excel 的 CSV 格式数据。

#### 选项对象

options 对象可以包含以下属性：

| 属性 | 类型 | 默认值 | 描述 |
|----------|-------|--------|-------------|
| proCode | string | "" | 自定义转换规则的 Pro 代码，需要有效的 JSON 转 Excel 服务订阅。如果提供了 options，则此为必填项。 |
| jsonMode | string | "flat" | JSON 输出的格式模式："nested"（嵌套）或 "flat"（扁平） |
| delimiter | string | "." | 使用 jsonMode: "nested" 时嵌套 JSON 键的分隔符，可接受的分隔符为 "."、"_"、"__"、"/"。 |
| maxDepth | string | "unlimited" | 使用 jsonMode: "nested" 时嵌套 JSON 对象的最大深度。maxDepth 可接受的值为 "unlimited"、"1" ~ "20"。 |

注意：
> - 如果提供了 options，则 proCode 是必填项。如果您没有有效的 [Pro 代码](https://json-to-excel.wtsolutions.cn/zh-cn/latest/pricing.html)，请使用不带 options 参数的免费版本，默认转换规则将被应用。
> - 详细的转换规则可在 [Pro 功能](https://json-to-excel.wtsolutions.cn/zh-cn/latest/profeatures.html) 中找到。

### 示例提示 1

将 JSON 文件转换为 Excel，文件 URL: https://mcp.wtsolutions.cn/example.json

### 示例提示 2
（仅当您没有 URL 并使用在线 AI LLM 时适用）

我刚刚上传了一个 .json 文件给您，请提取其 URL 并将其发送到 MCP 工具 'json_to_excel_mcp_from_url'，以进行 JSON 到 Excel 的转换。


## 响应格式

MCP 工具返回具有以下结构的 JSON 对象：

| 字段 | 类型 | 描述 |
|---------|--------|-------------|
| isError | boolean | 指示处理请求时是否出错 |
| msg | string | 'success' 或错误描述 |
| data | string | 转换后的 CSV 数据字符串，出错时为空字符串。此 CSV 数据可轻松导入到 Excel。 |

### 成功响应示例

```json
{
  "content": [{
    "type": "text",
    "text": "{\"isError\":false,\"msg\":\"success\",\"data\":\"Name,Age,IsStudent\n张三,25,false\n李四,30,true\"}"
  }]
}
```

以上是 MCP 工具的响应，在大多数情况下，您的 LLM 应该解释响应并向您呈现一个 JSON 对象，例如如下所示。
> 注意，不同的 LLM 模型可能有不同的解释 JSON 对象的方式，因此请检查您的 LLM 模型是否正确解释了 JSON 对象。


```json
{
  "isError": false,
  "msg": "success",
  "data": "Name,Age,IsStudent\n张三,25,false\n李四,30,true"
}
```

### 失败响应示例

```json
{
  "content": [{
    "type": "text",
    "text": "{\"isError\": true, \"msg\": \"Invalid JSON format\", \"data\": \"\"}"
  }]
}
```
以上是 MCP 工具的响应，在大多数情况下，您的 LLM 应该解释响应并向您呈现一个 JSON 对象，例如如下所示。
> 注意，不同的 LLM 模型可能有不同的解释 JSON 对象的方式，因此请检查响应是否被您的 LLM 模型正确解释。

```json
{
  "isError": true,
  "msg": "Invalid JSON format",
  "data": ""
}
```
或者，您的 LLM 可能会对您说"无效的 JSON 格式，请提供有效的 JSON 字符串"。

## 数据类型处理

API 自动处理 JSON 中的不同数据类型：

- **数字**：转换为 CSV 中的数值
- **布尔值**：转换为 'true'/'false' 字符串
- **字符串**：必要时进行转义和引用
- **数组**：转换为 JSON.stringify 数组字符串
- **对象**：转换为 JSON.stringify 对象字符串

## 错误处理

MCP 为常见问题返回描述性错误消息：

- `Invalid JSON format`：当输入数据不是有效的 JSON 字符串时
- `Empty JSON data`：当输入数据是空的 JSON 字符串时
- `Network Error when fetching file`：当从提供的 URL 下载文件时出错时
- `File not found`：当找不到提供的 URL 上的文件时
- `Server Internal Error`：当发生意外错误时

## 服务协议和隐私政策

使用 JSON 转 Excel MCP，即表示您同意 [服务协议](TERMS.md) 和 [隐私政策](PRIVACY.md)。


## 定价
使用默认的转换规则，免费。
使用自定义的转换规则，需要购买Pro Code，参考[定价](https://json-to-excel.wtsolutions.cn/zh-cn/latest/pricing.html)。

