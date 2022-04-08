exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();

  if (event.To) {
    // Wrap the phone number or client name in the appropriate TwiML verb
    // if is a valid phone number
    const attr = isAValidPhoneNumber(event.To) ? "number" : "client";

    const dial = twiml.dial({
      answerOnBridge: true,
      callerId: process.env.PHONENUMBER,
      record: 'record-from-answer',
      recordingStatusCallback: process.env.BASE_URL + '/call_events'
    });
    // twiml.start().stream({ url: 'wss://' +  process.env.BASE_URL + 'listen'});
    dial[attr]({}, event.To);
  } else {
    twiml.say("Thanks for calling!");
  }

  callback(null, twiml);
};

/**
 * Checks if the given value is valid as phone number
 * @param {Number|String} number
 * @return {Boolean}
 */
function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}
