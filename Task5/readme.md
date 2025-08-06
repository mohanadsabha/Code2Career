# Node.js Modules Comparison: `http` vs `https` vs `http2`

## 🔧 Purpose of Each Module

| Module   | Purpose |
|----------|---------|
| **`http`**   | Provides functionalities to create HTTP/1.1 server and client (non-secure). |
| **`https`**  | Same as `http`, but adds SSL/TLS support for secure communication (HTTPS). |
| **`http2`**  | Enables creation of HTTP/2 servers/clients. Can be used with or without TLS. |

---

## ⚙️ Key Technical Differences: HTTP/1.1 vs HTTP/2

| Feature               | HTTP/1.1                        | HTTP/2                              |
|----------------------|----------------------------------|-------------------------------------|
| **Connections**      | One request per connection or pipelining | Multiplexed streams over a single connection |
| **Performance**      | Latency due to multiple TCP connections | Lower latency, faster page loads |
| **Header Handling**  | Repeated headers in every request | Header compression (HPACK) |
| **Server Push**      | Not supported                   | Supported – server can push resources proactively |
| **Binary Protocol**  | Text-based                      | Binary-based (faster parsing) |

---

## 📌 When to Use Each Module

| Module   | Use Case |
|----------|----------|
| **`http`**   | Development, internal services, or when encryption isn't required. Good for simple APIs or local testing. |
| **`https`**  | Production APIs, websites, or services requiring secure communication (e.g., user authentication, payment systems). |
| **`http2`**  | Performance-critical applications (e.g., modern SPAs, media-heavy sites), especially when you want features like multiplexing and server push. Best used with HTTPS for browser compatibility. |
