![C:\\Users\\Omari\\Desktop\\logotum.png](media\image1.png){width="1.1369149168853894in"
height="0.8108880139982502in"}

**Technical University of Mombasa**

**Faculty of Engineering and Technology**

**DEPARTMENT OF ELECTRICAL AND ELECTRONIC ENGINEERING**

**Bachelor of Science in Electrical and Electronic Engineering**

**Project report** **submitted in partial fulfilment requirements for
the degree of Bachelor of Science in Electrical and Electronic
Engineering**

**INTEGRATED SECURITY SYSTEM FOR TUM**

**by**

**KIPLIMO MIKE CHUMBA**

**BSEE/032J/2012**

**Supervisor:** MR. FRANCIS MWANIKI

Date submitted: 5^TH^ JULY 2018.

# 

# DECLARATION

I, KIPLIMO MIKE CHUMBA, declare that the contents of this project
represent my own unaided work, and that the report has not been
previously submitted for academic examination towards any qualification.
Furthermore, it represents my own opinions and not necessarily those of
the Technical University of Mombasa.

Signed Date [\_]{.ul}

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

# ACKNOWLEDGEMENTS

I wish to thank: The Almighty God, Mr Mwaniki (Supervisor), Mr Mbaka, Mr
Omondi, Mr King'oo, Dr Mukhongo, Dr Asiyo, BSEE Sept. 2013 and my family
for their support.

# DEDICATION

This project is dedicated to the TUM fraternity.

# TABLE OF CONTENTS

[DECLARATION i](#declaration)

[ABSTRACT ii](#abstract)

[ACKNOWLEDGEMENTS iii](#acknowledgements)

[DEDICATION iv](#dedication)

[TABLE OF CONTENTS v](#_Toc518331854)

[TABLE OF FIGURES vii](#table-of-figures)

[GLOSSARY ix](#glossary)

[CHAPTER ONE 1](#chapter-one)

[INTRODUCTION 1](#introduction)

[1.1 Overview 1](#overview)

[1.2 Objectives 1](#objectives)

[1.2.1 Overall Objective 1](#overall-objective)

[1.2.2 Specific Objective 1](#specific-objective)

[1.3 Problem Statement 2](#problem-statement)

[1.4 Assumptions and Limitations 2](#assumptions-and-limitations)

[1.4.1 Assumptions 2](#assumptions)

[1.4.2 Limitations 2](#limitations)

[1.5 Significance and Motivation of Study
2](#significance-and-motivation-of-study)

[CHAPTER TWO 3](#chapter-two)

[2 Literature review 3](#literature-review)

[2.1 Introduction 3](#introduction-1)

[2.2 Existing Security Systems 3](#existing-security-systems)

[2.2.1 Remote Monitoring using Wireless Sensor Networks (WSN),
Bluetooth, WiFi, Zigbee technologies
3](#remote-monitoring-using-wireless-sensor-networks-wsn-bluetooth-wifi-zigbee-technologies)

[2.2.1.1 GSM-SMS Based Monitoring 4](#gsm-sms-based-monitoring)

[2.2.1.2 Internet Based Monitoring 7](#internet-based-monitoring)

[2.3 Literature Review Summary 10](#literature-review-summary)

[CHAPTER THREE 11](#chapter-three)

[3 Methodology 11](#methodology)

[3.1 Introduction 11](#introduction-2)

[3.2 Design 11](#design)

[3.2.1 The block diagram 11](#the-block-diagram)

[3.2.2 How the system works 11](#how-the-system-works)

[3.2.3 The token, id generation and logging section
12](#the-token-id-generation-and-logging-section)

[3.2.4 Identification and authentication for students
12](#identification-and-authentication-for-students)

[3.2.5 Server section 13](#server-section)

[3.2.6 Identification and authentication for staff
13](#identification-and-authentication-for-staff)

[3.2.7 Data visualization 13](#data-visualization)

[3.2.8 Design Summary 14](#design-summary)

[3.3 Construction 14](#construction)

[3.3.1 Introduction 14](#introduction-3)

[3.3.2 Obtaining the necessary tools for constructing the system
14](#obtaining-the-necessary-tools-for-constructing-the-system)

[3.3.3 Making the server 14](#making-the-server)

[3.3.4 Hosting the server code 15](#hosting-the-server-code)

[3.3.5 Making the mobile applications
15](#making-the-mobile-applications)

[3.3.6 Making the desktop application
16](#making-the-desktop-application)

[3.4 Testing 18](#testing)

[3.4.1 Testing the server 18](#testing-the-server)

[3.4.2 Testing the desktop application
19](#testing-the-desktop-application)

[3.4.3 Testing the mobile application
24](#testing-the-mobile-application)

[3.5 Challenges encountered and lessons learnt
28](#challenges-encountered-and-lessons-learnt)

[3.6 Deliverables achieved/not achieved
29](#deliverables-achievednot-achieved)

[3.7 Conclusion 30](#conclusion)

[3.8 Recommendations 31](#recommendations)

[3.9 Project Costing Approximation 32](#project-costing-approximation)

[3.10 Project Time Management 32](#project-time-management)

[REFERENCE 33](#reference)

[APPENDIX 1: Id Scanner 34](#appendix-1-id-scanner)

[APPENDIX II: Student Data 37](#appendix-ii-student-data)

# TABLE OF FIGURES

[**Figure 1** WSN for collecting data 3](#_Toc518037102)

[**Figure 2** Block Diagram One 4](#_Toc518037103)

[**Figure 3** Block Diagram Two 4](#_Toc518037104)

[**Figure 4** Flow Chart 5](#_Toc518037105)

[**Figure 5** Block Diagram Showing Functionality 6](#_Toc518037106)

[**Figure 6** Components 7](#_Toc518037107)

[**Figure 7** High Level Block Diagram of the System 7](#_Toc518037108)

[**Figure 8** How Onchip Sensors are Interconnected 8](#_Toc518037109)

[**Figure 9** Block Diagram 9](#_Toc518037110)

[**Figure 10** Block Diagram 9](#_Toc518037111)

[**Figure 11** High level representation 10](#_Toc518037112)

[**Figure 12** The block diagram of Integrated Security System for TUM
11](#_Toc518037113)

[**Figure 13** Sending valid JSON to the server using Postman
18](#_Toc518037114)

[**Figure 14** Examining the response from the server
18](#_Toc518037115)

[**Figure 15** A screenshot of the database showing the data sent
19](#_Toc518037116)

[**Figure 16** The desktop shortcut for launching the ISSTUM application
19](#_Toc518037117)

[**Figure 17** The Screen shown by the application when first launched
20](#_Toc518037118)

[**Figure 18** Generating and sending the token to the server
20](#_Toc518037119)

[**Figure 19** Token saved to the server 21](#_Toc518037120)

[**Figure 20** Token shown to the user after sending to the server
21](#_Toc518037121)

[**Figure 21** A QR Code reader showing that actually the code is
1530248890 as indicated in the server 21](#_Toc518037122)

[**Figure 22** Generating QR Codes for students given their registration
numbers 22](#_Toc518037123)

[**Figure 23** Displaying logs of sign in and sign out sorted by time of
activity 22](#_Toc518037124)

[**Figure 24** Exported security logs data in excel format
23](#_Toc518037125)

[**Figure 25** The exam details obtained from the server logs sorted by
date and time 23](#_Toc518037126)

[**Figure 26** Exported data in excel format 23](#_Toc518037127)

[**Figure 27** Launching ISSTUM mobile application for the first time
24](#_Toc518037128)

[**Figure 28** Checking data for a student who has paid school fees in
full or in excess 25](#_Toc518037129)

[**Figure 29** A student who has not paid school fees in full
25](#_Toc518037130)

[**Figure 30** Unknow student 26](#_Toc518037131)

[**Figure 31** Server response for a student whose details check out ok
in an exam room 26](#_Toc518037132)

[**Figure 32** Staff sign in and sign out using a valid access token
27](#_Toc518037133)

[**Figure 33** Staff sign in and sign out using an invalid or expired
security token 27](#_Toc518037134)

[**Figure 34** Online and offline status of the application
28](#_Toc518037135)

# GLOSSARY

WSN -- Wireless Sensor Networks

JSON -- JavaScript Object Notation

GSM -- Global Systems for Mobile communications

GPRS -- General Packet Radio Service

BSS -- Base Station Subsystem

NSS -- Network station Subsystem

RF -- Radio Frequency

SHM -- Structural Health Monitoring

APIs -- Application Programming Interfaces

CIA -- Confidentiality, Integrity and Availability

CCTV -- Closed Circuit Television

# 

# CHAPTER ONE

# INTRODUCTION

##  Overview

Security is very important. The CIA triad (Confidentiality, Integrity
and Availability) are the major principles behind every effective
security system. Security is an integral part in the success of every
institution. Security, other than safeguarding property, helps in the
preservation of human life. It also ensures accountability in the case
whereby access to certain rooms or areas is restricted.

Additionally, the ability to obtain, log, and review security data is
very critical.

TUM relies heavily on security guards. On the other hand, there has been
a proposal to set up a CCTV camera security system within the
institution but the project has not yet been implemented; showing how
hard it is to implement such a system. It is only the library that is
served with CCTV cameras.

During examinations, it is hard to verify students who are supposed to
sit for the exam, and the requirement to print and then queue for
stamping of the examination passes is cumbersome, time wasting, and
ineffective. It is ineffective because during the June/July 2017
Examination Series, several students had to be allowed to sit for
examination regardless of whether they had been verified to have paid
full school fees because verification process by the Student Finance
department was slow. Also, in February 2018, the Student Finance
personnel had to work on weekends so that they can complete verifying
student examination cards. This came up due to full reliance on a system
that is hard to streamline with the institutions objectives, the
objective for which is majorly to provide learning to only those
students who have completed paying the fees, especially when it comes to
offering examinations.

With all these issues in place, a security system that takes all these
factors into consideration is necessary.

##  Objectives

### Overall Objective

To design, construct and test an integrated security system for
Technical University of Mombasa.

### Specific Objective

1.  To perform a literature review of the existing security systems.

2.  To design the system necessary for the implementation of the
    features of the security system

3.  To construct the system

4.  To test and present the Integrated Security System for TUM

## Problem Statement

Many security systems exist, but they have major flaws. It is not easy
to account for security issues that occurred at certain dates. Security
systems also are of different varieties and are designed to achieve
different goals and this makes it hard to manage them. TUM, therefore,
can acquire such existing security solutions but since the systems are
not tailored to meet the specific requirements, this will be
ineffective.

Additionally, the use of old methods of verification, such as manually
checking the authenticity of an examination pass is not efficient.

Therefore, this project aims to ensure whenever there is a security
related activity, it is noted and safely logged by integrating various
security solutions into one. This makes it easier for management and
also enhances accountability.

Additionally, the ability to authenticate examination documents is also
an added advantage. This system is also modular, thus making it easy to
apply to all the relevant departments of the institution. Its strength
lies on data collection, storage, authentication, and its ease of use.

##  Assumptions and Limitations

### Assumptions

1.  It is assumed that internet connection to the system will always be
    working.

2.  It is assumed that online databases in use will not alter their
    features such that the system is always compatible with their APIs.

### Limitations

1.  Due to resource constraints and the required protocol for system
    interconnection, it is not possible to test the system with actual
    data from the institution. Thus, all the data is for demonstration
    of functionality only.

##  Significance and Motivation of Study

This study is motivated by the existence of various flaws within the
current implementations of security systems. Also, there is no
integrated security system in TUM to achieve the various set of features
that this system aims to provide.

# CHAPTER TWO

# Literature review

##  Introduction

This chapter contains the analysis of the existing security systems.

## Existing Security Systems

### Remote Monitoring using Wireless Sensor Networks (WSN), Bluetooth, WiFi, Zigbee technologies

Many Wireless Technologies like RF, Wi-Fi, Bluetooth and Zigbee have
been developed and remote monitoring systems using these technologies
are popular due to flexibility, low operating charges, etc. Today
Wireless Sensor Network are used in an increasing number of commercial
solutions, aimed at implementing distributed monitoring and control
system in a great number of different application areas.

\[1\] describe the emerging wireless sensor networks (WSN) for
autonomous Structural Health monitoring SHM systems for bridges. In
SmartBrick Network, the base station and sensor nodes collect data from
the onboard and external sensors. The sensor nodes communicate their
data from quasi-static sensors, e.g., temperature sensors, strain gauges
and seismic detectors to the base station over the ZigBee connection.
The base station processes these data and communicates them, along with
any alerts generated, to a number of destinations over the GSM/GPRS link
provided by the cellular phone infrastructure. The data are reported by
email and FTP to redundant servers, via the Internet, at regular
intervals or on an event-triggered basis. The alerts are sent directly
by SMS text messaging and by email. Wireless sensor networks are the key
enabler of the most reliable and durable systems for long-term SHM and
have the potential to dramatically increase public safety by providing
early warning of impending structural hazards.

![../../../../../../Wireless-Sensor-Network.png](media\image2.png){width="4.333333333333333in"
height="2.072402668416448in"}

[]{#_Toc518037102 .anchor}**Figure** **1** WSN for collecting data

Advantage: Naturally, ZigBee networks are extremely low power allowing
for efficient power usage. Also, WSN is an excellent implementation for
a security system whenever we need to collect as much data as possible.

### GSM-SMS Based Monitoring

With the wide spread use of cellular networks, this approach is also
popular when small amount of security data is to be transferred through
the network. Extensive work has been carried out by researchers using
this approach especially in medical field.

Below is a remote monitoring system based on SMS of GSM. The system
includes two parts which are the monitoring center and the remote
monitoring station. The monitoring center consists of a computer and a
TC35 GSM communication module. The computer and TC35 are connected by
RS232. The remote monitoring station includes a TC35 GSM communication
module, a MSP430F149 MCU, a display unit, various sensors, data
gathering and processing unit. \[2\]

![../../../../../../Screen%20Shot%202018-02-02%20at%2012.03.11%20](media\image3.png){width="2.175143263342082in"
height="2.047900262467192in"}

[]{#_Toc518037103 .anchor}**Figure** **2** Block Diagram One

![../../../../../../Screen%20Shot%202018-02-02%20at%2012.10.59%20](media\image4.png){width="3.6936482939632547in"
height="2.413073053368329in"}

[]{#_Toc518037104 .anchor}**Figure** **3** Block Diagram Two

Disadvantage: This system does not apply the use of a database, which is
important for a security system.

\[3\] implemented home security system by means of GSM cellular
communication network using microcontroller 89X52 and Sony Ericsson
GM-47 GSM module. This system enables far end user through SMS facility
to monitor the state of home door, provide password facility for key
based door lock and control home lighting system.

![](media\image5.tiff){width="2.6097561242344707in"
height="2.972916666666667in"}

[]{#_Toc518037105 .anchor}**Figure** **4** Flow Chart

\[4\] proposed and implemented a role-based intelligent mobile care
system with alert mechanism in chronic care environment. The roles
included patients, physicians, nurses, and healthcare providers. Each of
the roles represented a person that uses a mobile phone to communicate
with the server setup in the care. For mobile phones with Bluetooth
communication capability attached to chronic patients, physiological
signal recognition algorithms were implemented and built-in in the
mobile phone without affecting its original communication functions.
Several front-end mobile care devices were integrated with Bluetooth
communication capability to extract patients' various physiological
parameters \[such as blood pressure, pulse, saturation of hemoglobin
(SpO2), and electrocardiogram (ECG)\], to monitor multiple physiological
signals and to upload important or abnormal physiological information to
healthcare center for storage and analysis or transmit the information
to physicians and healthcare providers for further processing. An alert
management mechanism has been included in back-end healthcare center to
initiate various strategies for automatic emergency alerts after
receiving emergency messages or after automatically recognizing
emergency messages.

![../../../../../../Screen%20Shot%202018-02-02%20at%2012.39.23%20](media\image6.png){width="3.1979166666666665in"
height="2.3358409886264218in"}

[]{#_Toc518037106 .anchor}**Figure** **5** Block Diagram Showing
Functionality

\[5\] investigated the design and implementation of a remote data
collection and monitoring system. The system communication is based on
GSM short messages from cell phones using Siemens cell phone module
TC35. The serial interface of TC35 is directly connected to the serial
interface of PC computer. The system hardware includes remote client
monitoring hardware, central monitoring module, and 0809 A/D converter.
The central monitoring module sends commands via channel 1. Data
collection commands are sent out through TC35 to collect all sorts of
data. After data are collected they are processed by remote clients and
sent back to the central monitoring module by GSM short messages via
channel 2. Each monitoring module can connect up to 128 sensors and
equipment within the range of 1000 meters via RS485 interface. The
server hardware consists of an 8031 microprocessor, 74LS373, one 8 kB
2764 E2PROM, one 2 kB 6116 extended memory, and one 8155 programmable
serial interface chip. One 4×4 keyboard is connected to the PI port and
8 LED displays are connected to PA and PB ports of 8155.

![../../../../../../5218325-fig-1-large.gif](media\image7.gif){width="3.9895833333333335in"
height="2.58498687664042in"}

[]{#_Toc518037107 .anchor}**Figure** **6** Components

### Internet Based Monitoring

Internet monitoring is one of the common approaches for remote
monitoring. Many researchers have worked in field of Internet based
remote monitoring.

Below is an implemented Internet based wireless flexible solution where
home appliances are connected to slave node. The slave nodes communicate
with master node through RF and master node has serial RS232 link with
PC server. The nodes are based on PIC 16F877 μc. PC server is formed of
a user interface component, the database and the web server components.
An Internet page has been setup running on a Web server. The user
interface and the Internet front end are connected to a backend data
base server. The control of devices is established and their condition
is monitored through the Internet. \[6\]

Disadvantage: This system is only for monitoring and no authentication
is included.

![../../../../../../2-Figure1-1.png](media\image8.png){width="2.5104166666666665in"
height="2.4700765529308835in"}

[]{#_Toc518037108 .anchor}**Figure** **7** High Level Block Diagram of
the System

\[7\] used X10 controller interfaced through serial port to PC server
for control of devices. The Common Gateway Interface (CGI) is used to
interface between the browser and the X10 protocol via http connection.
The server executes CGI programs in order to satisfy a particular
request from the browser, which expresses its request using the http.

![../../../../../../Screen%20Shot%202018-02-03%20at%208.00.17%20](media\image9.png){width="4.790823490813648in"
height="3.4479166666666665in"}

[]{#_Toc518037109 .anchor}**Figure** **8** How Onchip Sensors are
Interconnected

Disadvantage: This system does not include authentication and
information system.

\[8\] designed wireless remote monitoring system based on the GPRS
(General Packet Radio Service) and the MCU (Microprogrammed Control
Unit). System is based on 89C58 microcontroller and PIML GPRS-MODEM as
the core, can collect data from eight sensors, control two-way Data
Acquisition, in the local real-time display and support remote Internet
monitoring. The data from sensors are encoded, sent to the WEB server
(fixed IP address or fixed domain name website) through the GPRS
channel. The system also accepts commands from remote monitoring centre.

Disadvantage: Even though this system uses internet monitoring, it fails
to include data storage solution.

![../../../../../../Screen%20Shot%202018-02-03%20at%209.22.50%20](media\image10.png){width="1.92624343832021in"
height="2.2527777777777778in"}

[]{#_Toc518037110 .anchor}**Figure** **9** Block Diagram

\[9\] developed application on remote monitoring system of reservoir
based on GPRS. GPRS data terminal hardware includes the intelligent
processing module, remote communication module, serial interface module
and display module. Intelligent processing module contains two chips
AT89C55 microcontroller and serial E2PROM X25045. AT89C55 is used to
transmit data between remote communication module, A/D conversion module
and display module. To ensure that data will not be lost because of
power outages, serial E2PROM X25045 device is adopted for data storage.
Remote communication module includes GPRS wireless module, SIM card and
serial module MAX3238. Database mainly stores various parameters of the
flood accommodation procedures for the user and reservoir historical
hydrological data.

Advantage: this system contains a database for storing a history of
data.

Disadvantage: GPRS is generally slow as it only allows speeds of up to
40kbps.

![../../../../../../Screen%20Shot%202018-02-03%20at%209.30.17%20](media\image11.png){width="2.2083333333333335in"
height="2.7525251531058617in"}

[]{#_Toc518037111 .anchor}**Figure** **10** Block Diagram

\[10\] developed a system composed of server which interfaces several
video surveillance cameras including several microphones for audio
surveillance. This server captures video and audio streams from the
video cameras and microphones and operates on these streams according to
the configuration of the local control software module. This module can
store the video and audio streams on local hard-disks, index video and
audio captures by time and place, retrieve images and sound based on
user specified time intervals and deliver them to the user via Internet,
or deliver (streaming) live images and sounds from a predefined camera.
The system is connected to the building power supply and can be
connected to the Internet via several communication solutions based on
their availability. In case of power grid failure the system is provided
with a secondary power supply based on rechargeable batteries which can
keep the system functional for several hours.

![../../../../../../Screen%20Shot%202018-02-03%20at%209.35.26%20](media\image12.png){width="2.9583333333333335in"
height="1.7255358705161854in"}

[]{#_Toc518037112 .anchor}**Figure** **11** High level representation

Disadvantage: This system works well but video over the internet
required very large bandwidth. The system also does not include
authentication.

## Literature Review Summary

From the analysis of the above systems, it is evident that none of these
systems can meet all the requirements laid out for an Integrated
Security System for TUM. However, where these systems excel in providing
their specific functionality, their contribution into the larger system
is significant and will be borrowed.**\
**

# CHAPTER THREE

# Methodology

## Introduction

This chapter deals with the design, construction, testing, project
costing, project time management and conclusion.

## Design

The design section explains how the system was put together considering
all the possible choices and also explaining how the system works.

### The block diagram

![](media\image13.png){width="5.937552493438321in"
height="5.243486439195101in"}

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

![](media\image14.png){width="6.5in" height="2.58125in"}

[]{#_Toc518037114 .anchor}**Figure** **13** Sending valid JSON to the
server using Postman

![](media\image15.png){width="6.5in" height="2.657638888888889in"}

[]{#_Toc518037115 .anchor}**Figure** **14** Examining the response from
the server

As expected, when the server receives a post request to the endpoint
with a valid JSON object, it sends the data to the database and then
responds to the requesting client, which in this case is Postman, with a
complete object that was posted to the database as shown in the figure
above.

![](media\image16.png){width="6.510416666666667in"
height="2.673028215223097in"}

[]{#_Toc518037116 .anchor}**Figure** **15** A screenshot of the database
showing the data sent

### Testing the desktop application

#### Installing the application

The ISSTUM desktop installer with a .exe extension was run on a windows
7 computer and also a windows 10 computer. On both cases, the
application installed as expected. After completing the installation
process, it created a desktop shortcut.

![](media\image17.png){width="2.15625in" height="0.7083333333333334in"}

[]{#_Toc518037117 .anchor}**Figure** **16** The desktop shortcut for
launching the ISSTUM application

#### Launching the application

When the application was launched using the desktop shortcut created, it
took a few seconds to start. First the application displayed a white
screen. Then, after finishing loading, it then displayed the token
generation section of the application.

![](media\image18.png){width="6.5625in" height="3.684395231846019in"}

[]{#_Toc518037118 .anchor}**Figure** **17** The Screen shown by the
application when first launched

#### Generating and logging the tokens to the server

When the 'refresh token' button was clicked, the application generated a
new token, sent the token to the server, and then reloaded the page
showing a new token that it had generated.

![](media\image19.png){width="6.5in" height="3.0284722222222222in"}

[]{#_Toc518037119 .anchor}**Figure** **18** Generating and sending the
token to the server

![](media\image20.png){width="5.03125in" height="1.3333333333333333in"}

[]{#_Toc518037120 .anchor}**Figure** **19** Token saved to the server

![](media\image21.png){width="2.6354166666666665in"
height="2.882136920384952in"}

[]{#_Toc518037121 .anchor}**Figure** **20** Token shown to the user
after sending to the server

![](media\image22.png){width="2.6354166666666665in"
height="1.9081419510061242in"}

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

![](media\image23.png){width="6.5in" height="3.654861111111111in"}

[]{#_Toc518037123 .anchor}**Figure** **22** Generating QR Codes for
students given their registration numbers

#### Displaying the logged data

![](media\image24.png){width="6.5in" height="3.6569444444444446in"}

[]{#_Toc518037124 .anchor}**Figure** **23** Displaying logs of sign in
and sign out sorted by time of activity

![](media\image25.png){width="6.489583333333333in"
height="3.342379702537183in"}

[]{#_Toc518037125 .anchor}**Figure** **24** Exported security logs data
in excel format

#### Displaying the logged exam details

![](media\image26.png){width="6.5in" height="3.44375in"}

[]{#_Toc518037126 .anchor}**Figure** **25** The exam details obtained
from the server logs sorted by date and time

![](media\image27.png){width="6.5in" height="0.6020833333333333in"}

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

![](media\image28.png){width="2.8020833333333335in"
height="4.9814807524059495in"}
![](media\image29.png){width="2.8020833333333335in"
height="4.981481846019247in"}

[]{#_Toc518037128 .anchor}**Figure** **27** Launching ISSTUM mobile
application for the first time

#### Checking the student details for a student who has paid school fees in full or in excess

![](media\image30.png){width="2.0742180664916887in" height="3.6875in"}
![](media\image31.png){width="2.0729166666666665in"
height="3.6851859142607175in"}
![](media\image32.png){width="2.071482939632546in"
height="3.682638888888889in"}

[]{#_Toc518037129 .anchor}**Figure** **28** Checking data for a student
who has paid school fees in full or in excess

#### Checking the student details for a student who has any school fees balance

![](media\image33.png){width="2.208203193350831in"
height="3.9256933508311462in"}

[]{#_Toc518037130 .anchor}**Figure** **29** A student who has not paid
school fees in full

#### Checking the student details for a student who is not in the system

![](media\image34.png){width="2.0729166666666665in"
height="3.685184820647419in"}

[]{#_Toc518037131 .anchor}**Figure** **30** Unknow student

#### Server response when the data about a student checks out ok

![](media\image35.png){width="2.0729166666666665in"
height="3.6851859142607175in"}

[]{#_Toc518037132 .anchor}**Figure** **31** Server response for a
student whose details check out ok in an exam room

#### Staff sign in and sign out using a valid access token

![](media\image36.png){width="2.0729166666666665in"
height="3.685184820647419in"}
![](media\image37.png){width="2.0680555555555555in"
height="3.676545275590551in"} ![](media\image38.png){width="2.0625in"
height="3.6666688538932632in"}

[]{#_Toc518037133 .anchor}**Figure** **32** Staff sign in and sign out
using a valid access token

#### Staff sign in and sign out using an expired or invalid access token

![](media\image39.png){width="2.0729166666666665in"
height="3.685184820647419in"}

[]{#_Toc518037134 .anchor}**Figure** **33** Staff sign in and sign out
using an invalid or expired security token

#### Online and offline status

![](media\image40.png){width="2.616405293088364in"
height="4.651388888888889in"}
![](media\image36.png){width="2.613280839895013in"
height="4.645833333333333in"}

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

## Project Costing Approximation

  Item            Number of Units   Cost Per Unit   Total Cost
  --------------- ----------------- --------------- ------------
  Internet                                          4,398
  Printing                                          1500
  Miscellaneous                                     1,000
  **Total**                                         **6,898**

> **Table 1 Project costing**

## Project Time Management

+-------+-------+-------+-------+-------+-------+-------+-------+
| **    | **Oct | **Nov | **    | **Feb | **Ma  | **J   | *     |
| ACTIV | 2     | 2     | Jan** | 2     | rch** | une** | *July |
| ITY** | 017** | 017** |       | 018** |       |       | 2     |
|       |       |       | **2   |       | **2   | **2   | 018** |
|       |       |       | 018** |       | 018** | 018** |       |
+=======+=======+=======+=======+=======+=======+=======+=======+
| Liter |       |       |       |       |       |       |       |
| ature |       |       |       |       |       |       |       |
| R     |       |       |       |       |       |       |       |
| eview |       |       |       |       |       |       |       |
+-------+-------+-------+-------+-------+-------+-------+-------+
| Pro   |       |       |       |       |       |       |       |
| posal |       |       |       |       |       |       |       |
| and   |       |       |       |       |       |       |       |
| Mini  |       |       |       |       |       |       |       |
| Pr    |       |       |       |       |       |       |       |
| esent |       |       |       |       |       |       |       |
| ation |       |       |       |       |       |       |       |
+-------+-------+-------+-------+-------+-------+-------+-------+
| D     |       |       |       |       |       |       |       |
| esign |       |       |       |       |       |       |       |
+-------+-------+-------+-------+-------+-------+-------+-------+
| Co    |       |       |       |       |       |       |       |
| nstru |       |       |       |       |       |       |       |
| ction |       |       |       |       |       |       |       |
+-------+-------+-------+-------+-------+-------+-------+-------+
| Te    |       |       |       |       |       |       |       |
| sting |       |       |       |       |       |       |       |
+-------+-------+-------+-------+-------+-------+-------+-------+
| Final |       |       |       |       |       |       |       |
| Pr    |       |       |       |       |       |       |       |
| esent |       |       |       |       |       |       |       |
| ation |       |       |       |       |       |       |       |
+-------+-------+-------+-------+-------+-------+-------+-------+

**Table 2 Time management**

# REFERENCE

  -- --
     
     
     
     
     
     
     
     
     
  -- --

\[1\] T. Harms, S. Sedigh and F. Bastianini, \"Structural Health
Monitoring of Bridges Using Wireless Sensor Networks,\" *EEE
Instrumentation & Measurement Magazine,* vol. 13, no. 6, pp. 14-18,
2010. \[2\] R.-G. Lee, C.-C. Lai, S.-S. Chiang, H.-S. Liu, C.-C. Chen
and G.-Y. Hsieh, \"A MOBILE-CARE SYSTEM OVER WIRELESS SENSOR NETWORK FOR
HOME HEALTHCARE APPLICATIONS,\" *Biomedical Engineering: Applications,
Basis and Communications,* vol. 19, no. 02, pp. 85-90, 2007. \[3\] A.
Alrehaish, \"Design and Implementation of Home Automation System,\"
*IEEE Transactions on Consumer Electronics,* vol. 50, no. 4, pp.
1087-1092, 2008. \[4\] L. Ren-Guey, C. Kuei-Chien, H. Chun-Chieh and T.
Chwan-Lu, \"A Mobile Care System With Alert Mechanism,\" *IEEE
TRANSACTIONS ON INFORMATION TECHNOLOGY IN BIOMEDICINE,* vol. 11, no. 5,
pp. 507-517, 2007. \[5\] Y. Hongwei and P. Hongxia, \" Remote data
monitoring system design based on GSM short message service,\" *IEEE
International Symposium on Industrial Electronics,* vol. 9, no. 10, pp.
364-367, 2009. \[6\] L. Akinyemi, O. Shoewu, A. A. N.T Makanjuola1 and
C. Folorunso, \"Design and Development of an Automated Home Control
System Using Mobile Phone,\" *World Journal Control Science and
Engineering,* vol. 2, no. 1, pp. 6-11, 2014. \[7\] U. B. Tayyab, E.
Shilpa and R. R. Surender, \"An FPGA-Based Design of an Intelligent
On-Chip Sensor Network Monitoring and Control,\" *International Journal
of Innovative Research in Computer and Communication Engineering,* vol.
4, no. 10, pp. 18795-18800, 2016. \[8\] K. Bhaskar, M. Govindu and G.
Krishnaniah, \"Design and Implementation of Base Board and Internet
Communication System Based on GPRS,\" *Global Journal of Advanced
Enlhanced Engineering Technologies,* vol. 1, no. 4, pp. 117 - 130, 2012.
\[9\] K. Suribabu and T. Naidu, \"Design of Web Based Remote Embedded
Monitoring System,\" *International Journal of Innovative Technologies,*
vol. 04, no. 03, pp. 550 - 565, 2016. \[10\] R. J.Dhivya and
M.Karthikeyan, \"Controlling Home Area Networks by Smartphone,\"
*International Journal of Computer Science and Information Technology
Research,* vol. 3, no. 2, pp. 228-223, 2015.

# APPENDIX 1: Id Scanner

# 

# window.paper = \'\"\' + this.paper + \'\"\'

**window.invigilator = \'\"\' + this.invigilator + \'\"\'**

**this.scanner = !this.scanner**

**if (this.scanner === true) {**

**QRScanner.scan(displayContents);**

**// alert(this.data);**

**function displayContents(err, text){**

**// this.\$store.state.data = text**

**if(err){**

**// an error occurred, or the scan was canceled (error code \`6\`)**

**}**

**else {**

**navigator.vibrate(500)**

**const date = new Date()**

**let mapDay =
\[\'Sun\',\'Mon\',\'Tue\',\'Wed\',\'Thu\',\'Fri\',\'Sat\'\]**

**let index = date.getDay()**

**let today = mapDay\[index\]**

**// let fun = Math.floor(\_.now() / 1000)**

**// console.log(fun)**

**let posted = \'\"\' + today + \' \' + date.getMonth() + \'/\'+
date.getDate() + \'/\'+ date.getFullYear() + \' @ \' + date.getHours() +
\':\' + date.getMinutes() + \' hrs\"\'**

**// console.log(code)**

**window.store.state.red = false**

**window.store.state.sending = false**

**window.store.state.sending = true**

**window.store.state.progress = \"Verifying the data for: \" +text**

**if (window.store.state.student_data != null) {**

**let new_text = text.replace(\'\"\', \'\')**

**let temp_data = window.store.state.student_data**

**let ghost_student = \_.find(temp_data, o =\> {return o.reg ===
new_text})**

**if (ghost_student === undefined) {**

**window.store.state.red = true**

**window.store.state.progress = \"Unknown student: \" + text**

**// break displayContent**

**}**

**let sanitized = \_.filter(temp_data, o =\> {return
o.balance.replace(\',\',\'\') \<= 0})**

**console.log(sanitized)**

**sanitized = \_.find(sanitized, o =\> {return o.reg === new_text})**

**console.log(sanitized)**

**if (sanitized != null) {**

**window.store.state.red = false**

**window.store.state.progress =\"Verified! Now sending data for: \" +
sanitized.name + \" Fee balance = \"+ sanitized.balance**

**axios.post(\'https://us-central1-safaris-10946.cloudfunctions.net/api/exam\',
{ name: sanitized.name,**

**reg: sanitized.reg,**

**paper: window.paper,**

**invigilator: window.invigilator,**

**date: posted**

**})**

**.then (response =\> {**

**window.store.state.sending = false**

**window.store.state.sending = true**

**window.store.state.red = false**

**window.store.state.progress = \"Data has been successfully sent and
saved to the database.\"**

**// setTimeout(window.store.state.sending = false, 5000)**

**})**

**.catch(err =\> {**

**window.store.state.progress = \"There was a problem trying to save the
data. Try again.\"**

**console.log(err)**

**})**

**} else {**

**// window.store.state.sending = false**

**// window.store.state.sending = true**

**let my_name = \_.find(temp_data, o =\> {return o.reg === new_text})**

**window.store.state.red = true**

**window.store.state.progress = \"Not allowed to sit for the exam! Fee
balance = \" + my_name.balance**

**}**

**}**

**// window.store.commit(\'addData\', text)**

**// window.store.state.sending = true**

**// window.store.state.name = text**

**// localStorage.setItem(\'name\', JSON.stringify(text))**

**// alert(\'this.\$store.getters.data\');**

**// The scan completed, display the contents of the QR code:**

**// this.sendCode(text);**

**// QRScanner.destroy();**

**}**

**}**

**// Make the webview transparent so the video preview is visible behind
it.**

**QRScanner.show();**

**}**

**else {**

**QRScanner.destroy(function (status) {**

**console.log(status)**

**})**

**window.store.state.sending = false }**

# APPENDIX II: Student Data

**\[**

**{**

**\"name\": \"Fred Matiangi\",**

**\"reg\": \"BSEE/032J/2012\",**

**\"balance\": \"0\"**

**},**

**{**

**\"name\": \"David Kimani Njoroge\",**

**\"reg\": \"BSEE/033J/2012\",**

**\"balance\": \"0\"**

**},**

**{**

**\"name\": \"John Kinyua\",**

**\"reg\": \"BSEE/034J/2012\",**

**\"balance\": \"4,000\"**

**},**

**{**

**\"name\": \"Monica Juma\",**

**\"reg\": \"BSEE/035J/2012\",**

**\"balance\": \"-2000\"**

**},**

**{**

**\"name\": \"Margaret Kobia\",**

**\"reg\": \"BSEE/036J/2012\",**

**\"balance\": \"0\"**

**},**

**{**

**\"name\": \"Amina Mohamed\",**

**\"reg\": \"BSEE/037J/2012\",**

**\"balance\": \"-50\"**

**},**

**{**

**\"name\": \"Sicily Kariuki\",**

**\"reg\": \"BSEE/038J/2012\",**

**\"balance\": \"10\"**

**},**

**{**

**\"name\": \"Simon Chelgui\",**

**\"reg\": \"BSEE/039J/2012\",**

**\"balance\": \"0\"**

**},**

**{**

**\"name\": \"Mwangi Kiunjuri\",**

**\"reg\": \"BSEE/040J/2012\",**

**\"balance\": \"0\"**

**},**

**{**

**\"name\": \"Eugene Wamalwa\",**

**\"reg\": \"BSEE/041J/2012\",**

**\"balance\": \"0\"**

**}**

**\]**
