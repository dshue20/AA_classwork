require 'json'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    cookie = req.cookies['_rails_lite_app']
    #debugger
    if cookie.nil?
      @hash = {}
    else
      @hash = JSON.parse(cookie)
      #self[hash.keys.first] = hash.values.first
      #debugger
    end
  end


  def [](key)
    @hash[key]
  end

  def []=(key, val)
    @hash[key] = val
  end



  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    res.set_cookie(
      "_rails_lite_app",
      { path: '/', value: @hash.to_json}
    )
  end
end
