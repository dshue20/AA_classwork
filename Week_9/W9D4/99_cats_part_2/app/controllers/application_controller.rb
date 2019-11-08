class ApplicationController < ActionController::Base
  helper_method :current_user, :login_user!, :already_logged_in
 

    def current_user
        User.find_by(session_token: session[:session_token])
    end

    def login_user!(user)
      session[:session_token] = user.reset_session_token!
    end

    def already_logged_in
        redirect_to cats_url if current_user
    end

end
