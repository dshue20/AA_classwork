class Api::PokemonController < ApplicationController
    def index
        @pokemon = Pokemon.all
    end

    def show
        @pokemon = Pokemon.find(params[:id])
    end

    def create
        @pokemon = Pokemon.new(pokemon_params)
        if @pokemon.save
            render :show
        else
            render json: @pokemon.errors.full_messages
        end
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:image_url, :attack, :defense, :name, :poke_type, moves: [], item_ids: [])
    end
end
