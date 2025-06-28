export const wifiSchemeObj={
    wifiSchemeId: 0,
    schemeName: '',
    description: '',
    region: '',
    speed: '',
    dataLimit: '',
    fee: 0,
    availabilityStatus: ''
}

export const userObj={
    userId: 0,
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    userRole:''
}

export const wifiSchemeRequestObj={
    wifiSchemeRequestId: 0,
    user:userObj,
    wifiScheme: wifiSchemeObj,
    requestDate: null,
    status: '',
    comments: '',
    proof: '',
    streetName: '',
    landmark:'',
    city: '',
    state: '',
    zipCode: '',
    preferredSetupDate: null,
    timeSlot: ''
}
export const feedbackObj={
    feedbackId:0,
    user:userObj,
    wifiScheme:wifiSchemeObj,
    category:'',
    feedbackText: '',
    date: null
}