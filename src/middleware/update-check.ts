import axios from 'axios'
import { config, log } from '../'

export const updateCheck = async () => {
  const firefoxVersion = config.version.version

  try {
    const { data } = await axios.get(
      `https://product-details.mozilla.org/1.0/firefox_history_major_releases.json`,
      { timeout: 1000 }
    )

    if (data) {
      let version = Object.keys(data)[Object.keys(data).length - 1]

      if (firefoxVersion && version !== firefoxVersion)
        log.warning(
          `Latest version of Firefox (${version}) does not match frozen version (${firefoxVersion}).`
        )
    }
  } catch (e) {}
}