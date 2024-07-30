import { useEffect, useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getStoredValue = () => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(getStoredValue)

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        window.dispatchEvent(new Event("local-storage-change"))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const removeItem = () => {
    try {
      setStoredValue(initialValue)

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
        window.dispatchEvent(new Event("local-storage-change"))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(
          event.newValue ? JSON.parse(event.newValue) : initialValue
        )
      }
    }

    const handleCustomEvent = () => {
      setStoredValue(getStoredValue())
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("local-storage-change", handleCustomEvent)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("local-storage-change", handleCustomEvent)
    }
  }, [key])

  return { storedValue, setValue, removeItem } as const
}
