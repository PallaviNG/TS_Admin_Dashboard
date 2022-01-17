    let recipient = "+917887571516";
    let textmessage= "Hi, This is an automated message from Twilio, please do not reply. Thank you, Have a nice day";
    sendTextMessage(`send-sms-integration?recipient=${recipient}&textmessage=${textmessage}`)
    .then((result) => {
      if(result===undefined) return false;
      toast.success("SMS Sent successfully");
      console.log(result);
          })
    .catch(error => console.error(error));


    //WOrking sms integration



    // nodemon is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected. ... nodemon is a replacement wrapper for node 