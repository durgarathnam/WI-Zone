import { User } from "./user.model";
import { WifiScheme } from "./wifi-scheme.model";

export class Feedback {
    feedbackId?: number;
    user:User;
    wifiScheme: WifiScheme;
    category: string;
    feedbackText: string;
    date: Date;
}
