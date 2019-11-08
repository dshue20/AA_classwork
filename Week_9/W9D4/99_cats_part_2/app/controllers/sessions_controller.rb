class SessionsController < ApplicationController
  before_action :already_logged_in
  
  def new
    render :new
  end

  def create
    user = User.find_by_credentials( params[:user_name], params[:password])
    if user 
      user.reset_session_token!
      session[:session_token] = user.session_token
      redirect_to cats_url
    else
      flash.now[:errors] = "Incorrect Username/Password"
      render :new
    end
  end

  def destroy
    current_user.reset_session_token! if current_user
    session[:session_token] = nil
    redirect_to new_session_url
  end
end