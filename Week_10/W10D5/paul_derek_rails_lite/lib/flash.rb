require 'json'

class Flash
    def initialize(req)
        cookie = req.cookies['_rails_lite_app_flash']
        @data_now = cookie ? JSON.parse(cookie) : {}
        @data = {}
    end
    
    def [](key)
        @data[key.to_s] || @data_now[key.to_s]
        #@data[cookie]['_rails_lite_app_flash']
    end

    def []=(key, val)
        @data[key.to_s] = val
    end

    def store_flash(res)
        res.set_cookie(
            "_rails_lite_app_flash",
            { path: '/', value: @data.to_json}
        )
    end

    def now
      @data_now
    end
end
