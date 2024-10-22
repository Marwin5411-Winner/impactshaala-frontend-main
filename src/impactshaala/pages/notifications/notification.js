import { useState, useEffect } from "react";
import PageTemplate1 from "../../../components/PageTemplate1";
import NotificationCard from "./notificationCard";

// Sample static notification data
import user1 from "../../../assets/images/user/1.jpg";
import user2 from "../../../assets/images/user/02.jpg";
import user3 from "../../../assets/images/user/03.jpg";
import user4 from "../../../assets/images/user/04.jpg";
import user5 from "../../../assets/images/user/05.jpg";
import { getNotificationsAPI } from "../../../api/notifications";
import { getReceivedFriendRequests, acceptFriendRequest } from "../../../api/profile";
import AcceptFriendRequestCard from "./acceptFriendRequest";

const notificationsData = [
  {
    image: user1,
    name: "Mila Kunis",
    description: "Posted in UI/UX Community",
    time: "1 day ago",
  },
  {
    image: user2,
    name: "Kamal Harris",
    description: "Liked Your Photo",
    time: "2 days ago",
  },
  {
    image: user3,
    name: "Justin Timberlake",
    description: "added a Story",
    time: "5 hours ago",
  },
  {
    image: user4,
    name: "Naruto Uzumaki",
    description: "Dattebayo",
    time: "1 day ago",
  },
  {
    image: user5,
    name: "Monkey D Luffy",
    description: "Gear 5th",
    time: "3 months ago",
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const getNotifications = async () => {
    try {
      // Fetch notifications from the API
      const { data, errRes } = await getNotificationsAPI();

      if (errRes) {
        console.error("Error fetching notifications:", errRes);
        return;
      }

      // If the API call is successful, update the state with the fetched notifications
      if (data && data.notifications) {
        console.log(data);
        setNotifications(data.notifications); // Use the data from the API response
      } else {
        setNotifications(notificationsData); // Fallback to static data if API fails
      }
    } catch (error) {
      console.error("Error:", error);
      setNotifications(notificationsData); // In case of an error, fallback to static data
    }
  };

  const getFriendRequests = async () => {
    try {
      const { data, errRes } = await getReceivedFriendRequests();

      if (errRes) {
        console.error("Error fetching friend requests:", errRes);
        return;
      }

      if (data && data.friendRequestsReceived) {
        setFriendRequests(data.friendRequestsReceived); // Use the data from the API response
      } else {
        setFriendRequests([]); // Fallback to an empty array if no data is available
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const onFriendAccept = async (requestId) => {

    try {
    const { data, errRes } = await acceptFriendRequest(requestId);
    
    if (errRes) {
      console.error("Error fetching friend requests:", errRes);
      return;
    }

    getFriendRequests();
  } catch (e) {
    console.error("Error : ", e);
  }


  }

  useEffect(() => {
    getNotifications();
    getFriendRequests();
  }, []);

  return (
    <PageTemplate1>
      <div className="p-3 d-flex flex-column" style={{ gap: "10px" }}>
        {notifications && Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((item, index) => (
            <NotificationCard data={item} key={index} />
          ))
        ) : (
          <p>No notifications found</p>
        )}
        <hr />
        {friendRequests && Array.isArray(friendRequests) && friendRequests.length > 0 ? (
          friendRequests.map((item, index) => (
            <AcceptFriendRequestCard data={item} key={index} onAccept={(() => onFriendAccept(item._id))} />
          ))
        ) : (
          <p>No Community Requests</p>
        )}
      </div>
    </PageTemplate1>
  );
};

export default Notification;
