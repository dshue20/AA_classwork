Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :update, :create, :destroy]
  resources :artworks, only: [:index, :show, :update, :create, :destroy]
end
