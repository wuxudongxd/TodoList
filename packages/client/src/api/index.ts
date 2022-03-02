const request = async (url: string, config: any) => {
  const baseUrl = "/api";
  try {
    const res = await fetch(baseUrl + url, config);
    if (!res.ok) {
      // 服务器异常返回
      throw Error("接口请求异常");
    }
    return res.json();
  } catch (error) {
    return await Promise.reject(error);
  }
};

// GET请求
export const get = (url: string) => {
  return request(url, { method: "GET" });
};

// POST请求
export const post = (url: string, data: any) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });
};

// PATCH请求
export const patch = (url: string, data: any) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "PATCH",
  });
};

// DELETE请求 (delete是JS关键字，这里换个名字)
export const deleteReq = (url: string, data: any) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "DELETE",
  });
};
