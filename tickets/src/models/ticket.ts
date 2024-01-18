import mongoose from 'mongoose';

type TicketBuildAttrs = {
    title: string;
    price: number;
    userId: string;
};

type TicketDoc = mongoose.Document & {
    title: string;
    price: number;
    userId: string;
};

type TicketModel = mongoose.Model<TicketDoc> & {
    build(attrs: TicketBuildAttrs): TicketDoc;
};

const ticketSchema = new mongoose.Schema<TicketBuildAttrs>(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        }
    }, 
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        }
    }
);

ticketSchema.statics.build = (attrs: TicketBuildAttrs) => {
    return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };