---
title: balilandvibe
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.28"

---

# balilandvibe

Base URLs:

# Authentication

# Default

## GET /destinations

GET /destinations

get all destinations

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer| no |get destinations by page|
|name|query|string| no |get destinations by name|
|address|query|string| no |get destinations by address|
|description|query|string| no |get destinations by description|
|sort|query|string| no |get destinations by sorted|
|category|query|array[string]| no |get destinations by categoies|
|district|query|array[string]| no |get destinations by districts|
|take|query|integer| no |get destinations by limit|

#### Enum

|Name|Value|
|---|---|
|sort|viewed|
|sort|name|
|sort|price|

> Response Examples

> 200 Response

```json
{
  "data": {
    "totalItems": 0,
    "perPageItems": 0,
    "items": [
      {
        "id": "string",
        "name": "string",
        "slug": "string",
        "description": "string",
        "cover": "string",
        "price": 0,
        "viewed": 0,
        "district": {
          "slug": "string",
          "name": "string"
        },
        "category": {
          "slug": "string",
          "name": "string"
        }
      }
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» data|object|true|none||none|
|»» totalItems|integer|true|none||total items|
|»» perPageItems|integer|true|none||per page items|
|»» items|[object]|true|none||none|
|»»» id|string|true|none||ID|
|»»» name|string|true|none||name|
|»»» slug|string|true|none||slug|
|»»» description|string|true|none||description|
|»»» cover|string|true|none||cover|
|»»» price|integer|true|none||price|
|»»» viewed|integer|true|none||viewed count|
|»»» district|object|false|none||district|
|»»»» slug|string|true|none||slug|
|»»»» name|string|true|none||name|
|»»» category|object|false|none||category|
|»»»» slug|string|true|none||slug|
|»»»» name|string|true|none||name|

## GET /destinations/slug

GET /destination/{SLUG}

get destination detail

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|SLUG|path|string| yes |none|

> Response Examples

> 200 Response

```json
{
  "data": {
    "id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "name": "string",
    "slug": "string",
    "description": "string",
    "cover": "string",
    "address": "string",
    "price": 0,
    "latitude": "string",
    "longitude": "string",
    "districtSlug": "string",
    "categorySlug": "string",
    "viewed": 0,
    "district": {
      "slug": "string",
      "name": "string"
    },
    "category": {
      "slug": "string",
      "name": "string"
    },
    "images": [
      {
        "url": "string"
      }
    ],
    "sources": [
      {
        "citationNum": 0,
        "name": "string",
        "year": "string",
        "publisher": "string",
        "doi": "string",
        "weblink": "string",
        "accessed": "string"
      }
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|when data not found|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» data|object|true|none||none|
|»» id|string|true|none||ID|
|»» createdAt|string|true|none||created time|
|»» updatedAt|string|true|none||updated time|
|»» name|string|true|none||name|
|»» slug|string|true|none||slug|
|»» description|string|true|none||description|
|»» cover|string|true|none||cover|
|»» address|string|true|none||address|
|»» price|integer|true|none||price|
|»» latitude|string|true|none||latitude|
|»» longitude|string|true|none||longitude|
|»» districtSlug|string|false|none||district slug|
|»» categorySlug|string|false|none||category slug|
|»» viewed|integer|true|none||viewed count|
|»» district|object|false|none||district|
|»»» slug|string|true|none||slug|
|»»» name|string|true|none||name|
|»» category|object|true|none||category|
|»»» slug|string|true|none||slug|
|»»» name|string|true|none||name|
|»» images|[object]|true|none||none|
|»»» url|string|true|none||url|
|»» sources|[object]|true|none||none|
|»»» citationNum|integer|false|none||citation number|
|»»» name|string|true|none||name|
|»»» year|string|false|none||year|
|»»» publisher|string|false|none||publisher name|
|»»» doi|string|false|none||doi url|
|»»» weblink|string|false|none||web url|
|»»» accessed|string|false|none||access time|

HTTP Status Code **404**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» errors|string|true|none||none|

# Data Schema

<h2 id="tocS_Destination">Destination</h2>

<a id="schemadestination"></a>
<a id="schema_Destination"></a>
<a id="tocSdestination"></a>
<a id="tocsdestination"></a>

```json
{
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "cover": "string",
  "address": "string",
  "price": 0,
  "latitude": "string",
  "longitude": "string",
  "districtSlug": "string",
  "categorySlug": "string",
  "viewed": 0,
  "district": {
    "id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "slug": "string",
    "name": "string",
    "description": "string",
    "body": "string",
    "logo": "string",
    "cover": "string",
    "destinations": [
      {
        "id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "name": "string",
        "slug": "string",
        "description": "string",
        "cover": "string",
        "address": "string",
        "price": 0,
        "latitude": "string",
        "longitude": "string",
        "districtSlug": "string",
        "categorySlug": "string",
        "viewed": 0,
        "district": {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "slug": "string",
          "name": "string",
          "description": "string",
          "body": "string",
          "logo": "string",
          "cover": "string",
          "destinations": [
            null
          ],
          "traditions": [
            null
          ]
        },
        "category": {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "slug": "string",
          "name": "string",
          "description": "string",
          "destinations": [
            null
          ]
        },
        "images": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "url": null,
            "traditionSlug": null,
            "districtSlug": null
          }
        ],
        "sources": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "citationNum": null,
            "name": null,
            "year": null,
            "publisher": null,
            "doi": null,
            "weblink": null,
            "accessed": null,
            "traditionSlug": null,
            "districtSlug": null
          }
        ]
      }
    ],
    "traditions": [
      {
        "id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "name": "string",
        "slug": "string",
        "description": "string",
        "body": "string",
        "cover": "string",
        "address": "string",
        "districtSlug": "string",
        "viewed": 0,
        "sources": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "citationNum": null,
            "name": null,
            "year": null,
            "publisher": null,
            "doi": null,
            "weblink": null,
            "accessed": null,
            "traditionSlug": null,
            "districtSlug": null
          }
        ],
        "images": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "url": null,
            "traditionSlug": null,
            "districtSlug": null
          }
        ]
      }
    ]
  },
  "category": {
    "id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "slug": "string",
    "name": "string",
    "description": "string",
    "destinations": [
      {
        "id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "name": "string",
        "slug": "string",
        "description": "string",
        "cover": "string",
        "address": "string",
        "price": 0,
        "latitude": "string",
        "longitude": "string",
        "districtSlug": "string",
        "categorySlug": "string",
        "viewed": 0,
        "district": {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "slug": "string",
          "name": "string",
          "description": "string",
          "body": "string",
          "logo": "string",
          "cover": "string",
          "destinations": [
            null
          ],
          "traditions": [
            null
          ]
        },
        "category": {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "slug": "string",
          "name": "string",
          "description": "string",
          "destinations": [
            null
          ]
        },
        "images": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "url": null,
            "traditionSlug": null,
            "districtSlug": null
          }
        ],
        "sources": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "citationNum": null,
            "name": null,
            "year": null,
            "publisher": null,
            "doi": null,
            "weblink": null,
            "accessed": null,
            "traditionSlug": null,
            "districtSlug": null
          }
        ]
      }
    ]
  },
  "images": [
    {
      "id": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "url": "string",
      "traditionSlug": "string",
      "districtSlug": "string"
    }
  ],
  "sources": [
    {
      "id": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "citationNum": 0,
      "name": "string",
      "year": "string",
      "publisher": "string",
      "doi": "string",
      "weblink": "string",
      "accessed": "string",
      "traditionSlug": "string",
      "districtSlug": "string"
    }
  ]
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none||ID|
|createdAt|string|true|none||created time|
|updatedAt|string|true|none||updated time|
|name|string|true|none||name|
|slug|string|true|none||slug|
|description|string|true|none||description|
|cover|string|true|none||cover|
|address|string|true|none||address|
|price|integer|true|none||price|
|latitude|string|true|none||latitude|
|longitude|string|true|none||longitude|
|districtSlug|string|false|none||district slug|
|categorySlug|string|false|none||category slug|
|viewed|integer|true|none||viewed count|
|district|[District](#schemadistrict)|false|none||district|
|category|[Category](#schemacategory)|true|none||category|
|images|[[Image](#schemaimage)]|true|none||none|
|sources|[[Source](#schemasource)]|true|none||none|

<h2 id="tocS_Tradition">Tradition</h2>

<a id="schematradition"></a>
<a id="schema_Tradition"></a>
<a id="tocStradition"></a>
<a id="tocstradition"></a>

```json
{
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "body": "string",
  "cover": "string",
  "address": "string",
  "districtSlug": "string",
  "viewed": 0,
  "sources": [
    {
      "id": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "citationNum": 0,
      "name": "string",
      "year": "string",
      "publisher": "string",
      "doi": "string",
      "weblink": "string",
      "accessed": "string",
      "traditionSlug": "string",
      "districtSlug": "string"
    }
  ],
  "images": [
    {
      "id": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "url": "string",
      "traditionSlug": "string",
      "districtSlug": "string"
    }
  ]
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none||ID|
|createdAt|string|true|none||created time|
|updatedAt|string|true|none||updated time|
|name|string|true|none||name|
|slug|string|true|none||slug|
|description|string|true|none||description|
|body|string|true|none||body|
|cover|string|true|none||cover|
|address|string|true|none||address|
|districtSlug|string|false|none||district slug|
|viewed|integer|true|none||viewed count|
|sources|[[Source](#schemasource)]|false|none||none|
|images|[[Image](#schemaimage)]|true|none||none|

<h2 id="tocS_Category">Category</h2>

<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "slug": "string",
  "name": "string",
  "description": "string",
  "destinations": [
    {
      "id": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "cover": "string",
      "address": "string",
      "price": 0,
      "latitude": "string",
      "longitude": "string",
      "districtSlug": "string",
      "categorySlug": "string",
      "viewed": 0,
      "district": {
        "id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "slug": "string",
        "name": "string",
        "description": "string",
        "body": "string",
        "logo": "string",
        "cover": "string",
        "destinations": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "name": null,
            "slug": null,
            "description": null,
            "cover": null,
            "address": null,
            "price": null,
            "latitude": null,
            "longitude": null,
            "districtSlug": null,
            "categorySlug": null,
            "viewed": null,
            "district": null,
            "category": null,
            "images": null,
            "sources": null
          }
        ],
        "traditions": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "name": null,
            "slug": null,
            "description": null,
            "body": null,
            "cover": null,
            "address": null,
            "districtSlug": null,
            "viewed": null,
            "sources": null,
            "images": null
          }
        ]
      },
      "category": {
        "id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "slug": "string",
        "name": "string",
        "description": "string",
        "destinations": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "name": null,
            "slug": null,
            "description": null,
            "cover": null,
            "address": null,
            "price": null,
            "latitude": null,
            "longitude": null,
            "districtSlug": null,
            "categorySlug": null,
            "viewed": null,
            "district": null,
            "category": null,
            "images": null,
            "sources": null
          }
        ]
      },
      "images": [
        {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "url": "string",
          "traditionSlug": "string",
          "districtSlug": "string"
        }
      ],
      "sources": [
        {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "citationNum": 0,
          "name": "string",
          "year": "string",
          "publisher": "string",
          "doi": "string",
          "weblink": "string",
          "accessed": "string",
          "traditionSlug": "string",
          "districtSlug": "string"
        }
      ]
    }
  ]
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none||ID|
|createdAt|string|true|none||created time|
|updatedAt|string|true|none||updated time|
|slug|string|true|none||slug|
|name|string|true|none||name|
|description|string|false|none||description|
|destinations|[[Destination](#schemadestination)]|true|none||destinations|

<h2 id="tocS_District">District</h2>

<a id="schemadistrict"></a>
<a id="schema_District"></a>
<a id="tocSdistrict"></a>
<a id="tocsdistrict"></a>

```json
{
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "slug": "string",
  "name": "string",
  "description": "string",
  "body": "string",
  "logo": "string",
  "cover": "string",
  "destinations": [
    {
      "id": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "cover": "string",
      "address": "string",
      "price": 0,
      "latitude": "string",
      "longitude": "string",
      "districtSlug": "string",
      "categorySlug": "string",
      "viewed": 0,
      "district": {
        "id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "slug": "string",
        "name": "string",
        "description": "string",
        "body": "string",
        "logo": "string",
        "cover": "string",
        "destinations": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "name": null,
            "slug": null,
            "description": null,
            "cover": null,
            "address": null,
            "price": null,
            "latitude": null,
            "longitude": null,
            "districtSlug": null,
            "categorySlug": null,
            "viewed": null,
            "district": null,
            "category": null,
            "images": null,
            "sources": null
          }
        ],
        "traditions": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "name": null,
            "slug": null,
            "description": null,
            "body": null,
            "cover": null,
            "address": null,
            "districtSlug": null,
            "viewed": null,
            "sources": null,
            "images": null
          }
        ]
      },
      "category": {
        "id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "slug": "string",
        "name": "string",
        "description": "string",
        "destinations": [
          {
            "id": null,
            "createdAt": null,
            "updatedAt": null,
            "name": null,
            "slug": null,
            "description": null,
            "cover": null,
            "address": null,
            "price": null,
            "latitude": null,
            "longitude": null,
            "districtSlug": null,
            "categorySlug": null,
            "viewed": null,
            "district": null,
            "category": null,
            "images": null,
            "sources": null
          }
        ]
      },
      "images": [
        {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "url": "string",
          "traditionSlug": "string",
          "districtSlug": "string"
        }
      ],
      "sources": [
        {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "citationNum": 0,
          "name": "string",
          "year": "string",
          "publisher": "string",
          "doi": "string",
          "weblink": "string",
          "accessed": "string",
          "traditionSlug": "string",
          "districtSlug": "string"
        }
      ]
    }
  ],
  "traditions": [
    {
      "id": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "name": "string",
      "slug": "string",
      "description": "string",
      "body": "string",
      "cover": "string",
      "address": "string",
      "districtSlug": "string",
      "viewed": 0,
      "sources": [
        {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "citationNum": 0,
          "name": "string",
          "year": "string",
          "publisher": "string",
          "doi": "string",
          "weblink": "string",
          "accessed": "string",
          "traditionSlug": "string",
          "districtSlug": "string"
        }
      ],
      "images": [
        {
          "id": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "url": "string",
          "traditionSlug": "string",
          "districtSlug": "string"
        }
      ]
    }
  ]
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none||ID|
|createdAt|string|true|none||created time|
|updatedAt|string|true|none||updated time|
|slug|string|true|none||slug|
|name|string|true|none||name|
|description|string|false|none||description|
|body|string|true|none||body|
|logo|string|false|none||logo|
|cover|string|false|none||none|
|destinations|[[Destination](#schemadestination)]|false|none||destinations|
|traditions|[[Tradition](#schematradition)]|false|none||traditions|

<h2 id="tocS_Image">Image</h2>

<a id="schemaimage"></a>
<a id="schema_Image"></a>
<a id="tocSimage"></a>
<a id="tocsimage"></a>

```json
{
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "url": "string",
  "traditionSlug": "string",
  "districtSlug": "string"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none||ID|
|createdAt|string|true|none||created time|
|updatedAt|string|true|none||updated time|
|url|string|true|none||url|
|traditionSlug|string|false|none||tradition slug|
|districtSlug|string|false|none||category slug|

<h2 id="tocS_Source">Source</h2>

<a id="schemasource"></a>
<a id="schema_Source"></a>
<a id="tocSsource"></a>
<a id="tocssource"></a>

```json
{
  "id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "citationNum": 0,
  "name": "string",
  "year": "string",
  "publisher": "string",
  "doi": "string",
  "weblink": "string",
  "accessed": "string",
  "traditionSlug": "string",
  "districtSlug": "string"
}

```

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none||ID|
|createdAt|string|true|none||created time|
|updatedAt|string|true|none||updated time|
|citationNum|integer|false|none||citation number|
|name|string|true|none||name|
|year|string|false|none||year|
|publisher|string|false|none||publisher name|
|doi|string|false|none||doi url|
|weblink|string|false|none||web url|
|accessed|string|false|none||access time|
|traditionSlug|string|false|none||tradition slug|
|districtSlug|string|false|none||category slug|

