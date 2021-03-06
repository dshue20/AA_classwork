require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require 'byebug'
require 'active_support/inflector'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, route_params = {})
    @req = req
    @res = res 
    @params = route_params.merge(req.params)
    @already_built_response = false
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    #@res['Content-Type'].nil? ? @already_built_response = false : @already_built_response = true
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    raise 'double render' if already_built_response?
    @res.status = 302
    @res.header['location'] = url
    @already_built_response = true
    self.session.store_session(@res)
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise 'double render' if already_built_response?
    @res.write(content)
    @res['Content-Type'] = content_type
    @already_built_response = true
    self.session.store_session(@res)
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    #debugger
    controller_name = self.class.to_s.underscore
    path = File.join("views", controller_name, template_name.to_s)
    path += ".html.erb"
    content = File.read(path)
    erb = ERB.new(content).result(binding)
    #debugger
    render_content(erb,"text/html")
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
    #debugger
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    self.send(name)
    render(name) unless already_built_response?
  end
end

