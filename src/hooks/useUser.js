import { useState, useEffect } from 'react'

import { getUser, getMe } from '../services/user.service'
import useAuth from './useAuth'

/**
 *
 * @param {string} u user_id, "ME" or "ALL"
 */
export default function useUser(u) {
  const { token } = useAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) return

    const userData = u === 'ME' ? getMe(token) : getUser(u, { token })

    userData.then(res => setUser(res)).catch(_ => setUser(null))
  }, [u, token, setUser])

  return user
}
