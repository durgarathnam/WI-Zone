import { User } from "./user.model";
import { WifiScheme } from "./wifi-scheme.model";

export interface WifiSchemeRequest {
    wifiSchemeRequestId?: number;
    user:User;
    wifiScheme: WifiScheme;
    requestDate: Date;
    status: string;
    comments: string;
    proof: string;
    streetName: string;
    landmark: string;
    city: string;
    state: string;
    zipCode: string;
    preferredSetupDate: Date;
    timeSlot: string;
}
