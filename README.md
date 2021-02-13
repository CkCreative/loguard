# ABSTRACT

Students are forced to endure long queues during exam periods to verify
their examination passes at Student Finance. Yet, the reason for
students to be able to download exam passes is to eliminate such queues.
Also, using counter books to log access information to certain rooms,
the library, and even at the school-gate for those with bikes, is slow
and cumbersome where future review is desired.

This project is about the design and implementation of an Integrated
Security System for Technical University of Mombasa. The system consists
of access token generator and data visualization module, an online
database for storage of data, a server application to validate the
submitted data and a mobile application to read and submit access
information; all connected through the Internet. The system eliminates
the need for exam passes, exam attendance signing and the use of log
books in restricted areas. The logs are presented in an intuitive
visualization which can be exported in Microsoft Excel format for
further processing.

TUM, businesses and other institutions that are ready to implement an
integrated security system to manage physical access for efficiency will
benefit from this security system.

---
## Design

The design section explains how the system was put together considering
all the possible choices and also explaining how the system works.

### The block diagram

![](media\image13.png)

[]{#_Toc518037113 .anchor}**Figure** **12** The block diagram of
Integrated Security System for TUM

### How the system works

The system is made up of five major sections, all for which are
explained below. These sections are: the token, id generation and
logging section, the student identification and authentication section,
the staff identification and authentication section, the server section
and finally the data visualization and presentation section.

### The token, id generation and logging section

This section is responsible for generating unique tokens each time a
token is requested. The token is calculated as a function of time in
seconds. This is so that the token can never exist twice, as time is
continuous. The token is generated and posted to the server before it is
streamed into a file in local storage.

**T** =
$\left( \left\lbrack \{\left\{ 365*Y + \frac{Y}{4} - \frac{Y}{100} + \frac{Y}{400} + D + \left( \frac{153*M + 8}{5} \right) \right\} - 719562\}*1440 \right\rbrack + 60H + M \right)*60 + S$
\-\-- (equation 1)

Where **T** is the token, **Y** is the year, **M** is the month of the
year, **D** is the day of the month, **H** is the number of hours in the
day, **M** is the number of minutes in the hour, and **S** is the number
of seconds after the minute.

This means that an internet connection is required each time a token is
generated.

The token that is sent to the server is a simple string, while the local
copy exists as an image file that is then saved to the filesystem and
then displayed to the person who requested the token.

These tokens however expire after 30 seconds for security reasons. When
a person tries to use the token after this time, since the formula for
calculating the token is predictable, it is first checked for validity.
If it is no longer valid, it will be rejected.

The reason for this security implementation is that the user of the
token should be next to the computer used to generate the token. This
closes off the loophole that would otherwise exist, where a person can
decide to request a friend to send them a token and then sign in or sign
out remotely.

### Identification and authentication for students

This section is made up of a mobile app that can scan QR Codes. These QR
Codes are generated from the id generation section above and can also be
generated from any other place desired as there are several applications
online that can do this. The mobile app takes fast snaps of the QR Code
to be scanned and analyses the data. When the data is captured, which is
a registration number represented in a QR Code, the data is checked
against a list of students that is obtained immediately the app starts,
and each time the app restarts, the list is updated.

The list of students and their details is stored in the server and is
downloaded to local storage and then parsed into a variable. If the
student has paid school fees in full or in excess, the app sends their
data to the server for logging in the database. Otherwise, the
invigilator is notified that the student is not allowed to sit for the
exam and their fee balance is provided too.

This section solves the problem of having to go to the finance office
for the exam pass to be verified and also prevents students from forging
the exam pass. Additionally, there is no need to have students who are
sitting for the exam to sign attendance list because the app will file
the attendance automatically after verifying that the student is allowed
to sit for the exam. The data sent to the server includes the time and
date, which is very effective.

### Server section

The server is essentially a REST server. The server listens for post
requests in specific endpoints and then responds with data accordingly
to acknowledge that the post request was successful. Therefore, it
basically waits for the token generated and the students that have been
authenticated and then updates the server with the information it
receives.

By having a server that stands between the database and the token
generation or the mobile app, it allows for validation of the data that
is sent to the database so that no unwanted data is stored. Also, for
the token generation, the server acts as the final say ensuring that the
tokens are absolutely valid and reduces the probability of abuse to a
minimum, or even makes it impossible.

### Identification and authentication for staff

This consists of a mobile app. When a staff member opens the app, they
can choose the type of access, whether sign-in or sign-out. They then
enter their name and they are then able to request and scan a token.

The token they scan should be freshly generated, and they cannot use a
token that was generated more than 30 seconds ago. When the token has
been verified, their data is then sent to the server. The server then
attaches its token and saves the data to the database.

The app also knows the time and date that the access was made and thus
the data that is sent to the server contains this information.

### Data visualization

The students who sat for an exam have their data stored in the server
when their ID is scanned by the app that the invigilator has. Also, the
staff who access a given office also have their data stored. To make
this data useful, a desktop application for the purpose of retrieving
and making sense of this data is also provided.

When the data is added to the server, it can immediately be accessed and
visualized using the desktop application. The form in which data is
displayed is so that one can refresh the data to retrieve current
versions and even get the data they want through a simple search that
filters the results. The results can also be sorted as the user wants.

The desktop app has sections that display this data in a very intuitive
manner. When a user would rater export this data for printing and so on,
they can export the data to Microsoft Excel format where they can
further apply useful formulas and then use the data as they see fit.

### Design Summary

After completing the design, Firebase was selected for the database,
JavaScript was chosen to program the system, Android operating system
was targeted as the mobile platform, Windows was chosen as the desktop
platform and VS Code as the code editor, git (BitBucket.org) was used
for version control and code backup.

## Construction

### Introduction

This section highlights the process and all the activities that went
into the development of the integrated security system.

### Obtaining the necessary tools for constructing the system

The development environment consisted of: Cmder for Windows, NodeJS,
NPM, Firebase CLI, VS Code and Postman.

### Making the server

The server is the most critical component of this system. It ensures
that there is a communication between the data visualization module and
the data collection and verification module. Therefore, this was the
first component to be programmed to accept JSON data to be sent via a
HTTPS post request and also to respond after successfully receiving the
data. It was also programmed to validate the data it receives and then
save it to the database. The server was programmed to receive data from
dedicated REST endpoints. To validate the data that the server receives,
it appends a token that is generated the same way as the one used to
send the data. This means that the system remains secure and free from
manipulation.

### Hosting the server code

A Google account was then used to sign in and create a project in
Firebase, while setting all the necessary permissions and acquiring all
necessary configurations to add into the application. The server code
was then uploaded to Firebase Cloud Functions using the Firebase CLI.

### Making the mobile applications

The language that was chosen for programming the multi-platform system
was JavaScript. To make this code work on the mobile phone, Apache
Cordova was used.

First, the features of the application were listed. Then a user
interface with all the features required was drawn using Affinity
Designer. The design was then implemented in code, one part after
another. This was then followed by wiring the user interface and the
functionality desired together. JavaScript was then used to adapt the
user interface with the various functions.

#### The tool bar section

The buttons that are named "Sign In", "Students" and "Open Scanner" were
attached to the functions for opening the scanner for the staff,
transitioning to the students' section, and opening the scanner for the
student details accordingly.

#### The input sections

The input sections are divided into two. There is a page for the staff
to enter their details and also there is a section for the details about
the exam to be entered.

#### The camera feeds

When a person presses the buttons for sign in and open scanner, they are
presented with a camera feed from the smartphone the person is using.
The camera feed can be toggled to open or close by the same buttons.

#### The connectivity status

A connectivity status was added so that a user can know when they have
an internet connection or not. This was achieved by checking the network
status and then toggling a Boolean when the network state changes. This
allowed for a real-time updating about the network status because it is
absolutely necessary to allow the mobile app to connect to the sever to
retrieve the students details and at the same time to send the data to
the server.

### Making the desktop application

The desktop application was programmed to work both as a way to generate
the student IDs and tokens yet at the same time double for the use in
data presentation.

#### The user interfaces

The user interface was first drawn on a paper and then adapted in small
sections. These small sections made up the modules of the application
whereby each major feature was given its own page for easy usage and
access. These modules were then implemented in programming and random
JSON data was used to visualize how the application will look at the end
of it.

#### Generating tokens

To generate the tokens, a function was added that calculates the time
since 1^st^ of January 1970 and then displays this time in seconds. At
first, the token was just displayed as a simple number using the
console. The next step was to convert this token to QR Code. After
defining the text to QR Code function, a button was added to the user
interface and attached to the button's 'click' event. Therefore, when
the button is clicked, the QR Code is encoded and then saved to file
with a .png extension because it is an image. This image is then
displayed to the user.

#### Generating student codes

Just as in the token generation section, instead of using the calculated
time, the input from the user is stored in a variable and then passed to
the QR Code encoding function when the button is clicked which then
converts this text into an image which is saved, and the page is
reloaded to display the refreshed image.

#### Connecting to the online API

The server used is owned by Google. The API allows one to query data
from an endpoint or using direct database access. However, in this
project the program was allowed access to only an endpoint so that the
database is independent. Therefore, the only module that can post to the
database is the server application and not the desktop application.

#### Sending data

To send the data to the API endpoint, a post request is made with a
valid

#### Displaying the data

When the endpoint was found to be returning the expected data, this data
was then cleaned up. First, the data is parsed as JSON, then, each
object is pushed into an array, ignoring the keys. Each time the
application boots, the endpoint is queried for fresh data if there is an
internet connection. The array is then saved to the disk in a .json
file. Since the process is repeated each time the application boots up,
it means that there is a possibility of duplicate data. Therefore, a
function checks to ensure there that the data added to the array is
unique, and if there is no new data, the array remains untouched by the
function.

The array is then iterated through and its various indices hold objects
that are bound to the user interface with a for loop.

#### Packaging the application

The application was then exported to an .exe file that can be run on any
Microsoft Windows machine. Windows 7 was used to run the .exe file.

## Testing

After completing the programming of the system, the system was then
subjected to various tests to make sure that everything was working as
expected and also to find an opportunity to collect results.

### Testing the server

Postman was used to test the REST endpoints of the server.

![](media\image14.png)

[]{#_Toc518037114 .anchor}**Figure** **13** Sending valid JSON to the
server using Postman

![](media\image15.png)

[]{#_Toc518037115 .anchor}**Figure** **14** Examining the response from
the server

As expected, when the server receives a post request to the endpoint
with a valid JSON object, it sends the data to the database and then
responds to the requesting client, which in this case is Postman, with a
complete object that was posted to the database as shown in the figure
above.

![](media\image16.png)

[]{#_Toc518037116 .anchor}**Figure** **15** A screenshot of the database
showing the data sent

### Testing the desktop application

#### Installing the application

The ISSTUM desktop installer with a .exe extension was run on a windows
7 computer and also a windows 10 computer. On both cases, the
application installed as expected. After completing the installation
process, it created a desktop shortcut.

![](media\image17.png)

[]{#_Toc518037117 .anchor}**Figure** **16** The desktop shortcut for
launching the ISSTUM application

#### Launching the application

When the application was launched using the desktop shortcut created, it
took a few seconds to start. First the application displayed a white
screen. Then, after finishing loading, it then displayed the token
generation section of the application.

![](media\image18.png)

[]{#_Toc518037118 .anchor}**Figure** **17** The Screen shown by the
application when first launched

#### Generating and logging the tokens to the server

When the 'refresh token' button was clicked, the application generated a
new token, sent the token to the server, and then reloaded the page
showing a new token that it had generated.

![](media\image19.png)

[]{#_Toc518037119 .anchor}**Figure** **18** Generating and sending the
token to the server

![](media\image20.png)

[]{#_Toc518037120 .anchor}**Figure** **19** Token saved to the server

![](media\image21.png)

[]{#_Toc518037121 .anchor}**Figure** **20** Token shown to the user
after sending to the server

![](media\image22.png)

[]{#_Toc518037122 .anchor}**Figure** **21** A QR Code reader showing
that actually the code is 1530248890 as indicated in the server

#### Generating student codes

To generate the student codes, the section within the menu named
'student codes' was opened. This presented a form to insert the
registration number of the student. When the registration number was
entered, the generate code button became active. After generating the
code for the student, the page was reloaded showing the new student QR
Code that matches the details of the student that were entered. It was
then possible to save the code as a PNG file for printing.

![](media\image23.png)

[]{#_Toc518037123 .anchor}**Figure** **22** Generating QR Codes for
students given their registration numbers

#### Displaying the logged data

![](media\image24.png)

[]{#_Toc518037124 .anchor}**Figure** **23** Displaying logs of sign in
and sign out sorted by time of activity

![](media\image25.png)

[]{#_Toc518037125 .anchor}**Figure** **24** Exported security logs data
in excel format

#### Displaying the logged exam details

![](media\image26.png)

[]{#_Toc518037126 .anchor}**Figure** **25** The exam details obtained
from the server logs sorted by date and time

![](media\image27.png)

[]{#_Toc518037127 .anchor}**Figure** **26** Exported data in excel
format

### Testing the mobile application

#### Installing the mobile application

After compiling the mobile application code and packaging it as a .apk
file, it was installed on an Android phone after enabling unknown
sources in the settings. After installation, the application was
available from the application drawer.

#### Running the mobile application

When the mobile application was first run, it showed a welcome screen
with a loading animation. The application then opened showing the staff
login section by default with an online or offline status indicator on
the menu bar.

![](media\image28.png)
![](media\image29.png)

[]{#_Toc518037128 .anchor}**Figure** **27** Launching ISSTUM mobile
application for the first time

#### Checking the student details for a student who has paid school fees in full or in excess

![](media\image30.png)
![](media\image31.png)
![](media\image32.png)

[]{#_Toc518037129 .anchor}**Figure** **28** Checking data for a student
who has paid school fees in full or in excess

#### Checking the student details for a student who has any school fees balance

![](media\image33.png)

[]{#_Toc518037130 .anchor}**Figure** **29** A student who has not paid
school fees in full

#### Checking the student details for a student who is not in the system

![](media\image34.png)

[]{#_Toc518037131 .anchor}**Figure** **30** Unknow student

#### Server response when the data about a student checks out ok

![](media\image35.png)

[]{#_Toc518037132 .anchor}**Figure** **31** Server response for a
student whose details check out ok in an exam room

#### Staff sign in and sign out using a valid access token

![](media\image36.png) ![](media\image37.png) ![](media\image38.png)

[]{#_Toc518037133 .anchor}**Figure** **32** Staff sign in and sign out
using a valid access token

#### Staff sign in and sign out using an expired or invalid access token

![](media\image39.png)

[]{#_Toc518037134 .anchor}**Figure** **33** Staff sign in and sign out
using an invalid or expired security token

#### Online and offline status

![](media\image40.png)
![](media\image36.png)

[]{#_Toc518037135 .anchor}**Figure** **34** Online and offline status of
the application

## Challenges encountered and lessons learnt

During the initial stages of designing the system, the first glaring
challenge was how to prevent someone from sharing access codes with
another person through media such as WhatsApp so that the person
receiving the code can sign in remotely thus fooling the system. The
solution to this was to make sure that the access tokens be a function
of time. Therefore, they can be checked for expiry.

The next challenge was how to deal with students who have not been added
to the system because checking the database was appeared to be a
continuous loop. The solution to this challenge was to first check the
student id if it is present in the system. If present, the function that
checks school fees would not be invoked and thus avoiding the endless
loop.

Another challenge was how to make sure that the use in the exam room is
flawless, meaning that the data checking should be done as fast as
possible. To avoid the delays that connecting to the internet to check
data for each student, data would be updated each time the app is
started.

## Deliverables achieved/not achieved

All the objectives of this project were achieved.

## Conclusion

The system eliminates the need for the use of slow paper-related methods
when capturing access logs, validating information in exam rooms and
also makes it easy to review captured information. The system is
therefore a demonstration of an effective and efficient modern
technology integration in the daily operations at TUM. This will mean no
need for exam passes, exam attendance signing and log books in
restricted areas.

## Recommendations

TUM, companies, hotels and learning institutions can implement this
system as is and be able to log access information in real-time.

Using AI to report anomalies in the data collected is possible (data is
available in valid JSON). Also, making sure that the IP address of the
computer generating the tokens is fixed will add a layer of security
thus making sure that the system is 100% fool proof.
