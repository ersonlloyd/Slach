class Api::V1::MessagesController < ApiController
  def index
    @messages = Message.all

    render json: @messages, each_serializer: Api::V1::MessageSerializer
  end

  def create
    @messages = Message.new(message_params)

    if @messages.save
      render json: @messages, serializer: Api::V1::MessageSerializer
    else
      render json: { message: @messages.errors.full_messages.to_sentence }, status: 422
    end
  end

  def update
    @messages = Message.find(params[:id])

    if @messages.update_attributes(message_params)
      render json: @messages, serializer: Api::V1::MessageSerializer
    else
      render json: { message: @messages.errors.full_messages.to_sentence }, status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :receiveable_type, :receiveable_id)
  end
end
