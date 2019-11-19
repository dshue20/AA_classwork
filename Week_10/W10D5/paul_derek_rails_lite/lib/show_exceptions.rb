require 'erb'

class ShowExceptions
  attr_reader :app
  def initialize(app)
    @app = app
  end

  def call(env)
    @app.call(env)
    #flash[:errors] = @app.errors_full_messages
  end

  private

  def render_exception(e)
    begin
      
    rescue => exception
      
    end
  end

end
