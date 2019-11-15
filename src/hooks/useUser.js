import { useState, useEffect } from 'react'

import { getUser, getMe } from '../services/user.service'
import useAuth from './useAuth'

/**
 *
 * @param {string} u user_id, "ME" or "ALL"
 * @param {{ reload: any }}
 */
export default function useUser(u, { reload } = {}) {
  const { token } = useAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) return

    const userData = u === 'ME' ? getMe(token) : getUser(u, { token })

    userData.then(res => setUser(res)).catch(_ => setUser(null))
  }, [u, token, setUser, reload])

  return user
}
