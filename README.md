# RN job finder link
https://expo.dev/@atumad/RNJobFinder?serviceType=classic&distribution=expo-go



# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-react-native-app -t with-router
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
- [Request for Comments](https://github.com/expo/router/discussions/1)


## status code 429 Error
One way to fix the 429 error in this code is to implement an exponential backoff strategy to retry failed requests. Here's the modified code:

```javascript
const fetchData = async (retryCount = 0) => {
  setIsLoading(true);

  try {
    const response = await axios.request(options);
    setData(response.data.data);
    setIsLoading(false);
  } catch (error) {
    if (error.response?.status === 429 && retryCount < 3) {
      const waitSeconds = Math.pow(2, retryCount);
      console.log(`Rate limited, retrying in ${waitSeconds} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
      fetchData(retryCount + 1);
    } else {
      setError(error);
      setIsLoading(false);
    }
  }
};

useEffect(() => {
  fetchData();
}, []);

return { data, isLoading, error };
```

Here's how the modified code works:

- The `fetchData` function now has an optional `retryCount` parameter that defaults to 0.
- If the request fails with a 429 status code, and the `retryCount` is less than 3, the function implements an exponential backoff strategy to wait before retrying the request. The wait time is calculated as 2 to the power of `retryCount` seconds (1 second, 2 seconds, 4 seconds, etc).
- The function then recursively calls itself with an incremented `retryCount`.
- If the request fails for any other reason, or the maximum number of retries is reached, the function sets the error state and isLoading state to `false`.
- The `useEffect` hook still calls the `fetchData` function when the component mounts.
- The modified code returns the data, isLoading, and error states as before.