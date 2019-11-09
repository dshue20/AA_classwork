class BandsController < ApplicationController
    def index
        @bands = Band.all 
        render :index
    end

    def show
        @band = Band.find_by(id: params[:id])
        render :show 
    end

    def new
        @band = Band.new
        render :new
    end

    def create
        @band = Band.new(band_params)
        if @band.save
            redirect_to band_url(@band)
        else
            flash.now[:errors] = "Failed to create band"
            render :new
        end
    end

    def edit
        @band = Band.find_by(id: params[:id])
        render :edit
    end

    def update
        @band = Band.find_by(id: params[:id])
        if band.update(band_params)
            redirect_to band_url(@band)
        else
            flash.now[:errors] = "Failed to edit band"
            render :new
        end
    end

    def destroy
        @band = Band.find(params[:id])
        @band.destroy
        redirect_to bands_url
    end

    private

    def band_params
        params.permit(:name)
    end
end