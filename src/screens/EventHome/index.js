import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../state/mainContext";
import {
  getAllEvents,
  getEventTypes,
  createEvent
} from "../../utils/api/events";
import Select from "react-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import Loader from "react-loader-spinner";
import moment from "moment";

const EventHome = () => {
  const { state, logOut, setLoading } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [types, setTypes] = useState([]);
  const [slots, setSlots] = useState([]);
  const [blur, setBlur] = useState(false);
  const [field, setField] = useState({
    name: "",
    event_type: "",
    start: new Date(),
    end: ""
  });

  const getSlots = () => {
    const hours = [];
    for (let hour = 0; hour < 12; hour++) {
      hours.push(moment({ hour }).format("LT"));
      hours.push(
        moment({
          hour,
          minute: 30
        }).format("LT")
      );
    }
    setSlots(hours);
    //console.log(hours);
  };

  const getEvents = async () => {
    setLoading(true);
    const res = await getAllEvents();
    setLoading(false);
    setEvents(res.data);
  };

  const getTypes = async () => {
    setLoading(true);
    const res = await getEventTypes();
    setLoading(false);
    res.data && setTypes(res.data);
  };

  const newEvent = async () => {
    setLoading(true);
    const res = await createEvent(field);
    setLoading(false);
    setBlur(!blur);
    if (res.data.id) {
      alert("New Event Created.");
    } else {
      alert("Something went error. Try again.");
    }
  };

  useEffect(() => {
    getEvents();
    getTypes();
    getSlots();
    console.log(field);
  }, [blur]);

  if (state.loading) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }

  return (
    <>
      <div className={!blur ? "container1" : "container1 active"}>
        {events.map((item, index) => (
          <div className="card" key={index}>
            <div className="box">
              <div className="content">
                <h2>{index + 1}</h2>
                <h3>{item.name}</h3>
                <p
                  className={
                    item.event_type === "Bootcamp"
                      ? "typevent bg1"
                      : item.event_type === "Charity"
                      ? "typevent bg2"
                      : item.event_type === "Charitable auctions"
                      ? "typevent bg3"
                      : item.event_type === "Exhibitions"
                      ? "typevent bg4"
                      : item.event_type === "Corporate"
                      ? "typevent bg5"
                      : item.event_type === "Family"
                      ? "typevent bg6"
                      : item.event_type === "Fundraising"
                      ? "typevent bg7"
                      : item.event_type === "Holiday"
                      ? "typevent bg8"
                      : item.event_type === "Music events"
                      ? "typevent bg9"
                      : item.event_type === "Networking events"
                      ? "typevent bg10"
                      : item.event_type === "Product launches"
                      ? "typevent bg11"
                      : item.event_type === "Sports events"
                      ? "typevent bg12"
                      : item.event_type === "Sponsored runs"
                      ? "typevent bg13"
                      : item.event_type === "Trade shows"
                      ? "typevent bg14"
                      : null
                  }
                >
                  {item.event_type}
                </p>
                <p className="detail">
                  <strong>Start Time:</strong>{" "}
                  {moment(item.start).format("LLL")}
                </p>
                <p className="detail">
                  <strong>End Time:</strong> {moment(item.end).format("LLL")}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            display: "flex",
            margin: "40px"
          }}
        >
          <button className="button" onClick={() => setBlur(!blur)}>
            Add Event
          </button>
          <button className="button" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
      </div>

      {blur ? (
        <div className="popup">
          <input
            type="text"
            name="EventName"
            placeholder="Enter Event Name..."
            value={field.name}
            onChange={(e) => setField({ ...field, name: e.target.value })}
          />

          <Select
            value={field.event_type}
            onChange={(item) => setField({ ...field, event_type: item })}
            options={types}
            getOptionLabel={(types) => types}
            getOptionValue={(types) => types}
          />
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              margin: "20px 0"
            }}
          >
            <Calendar
              onChange={(date) => setField({ ...field, start: date })}
              value={field.start}
            />
          </div>
          <Select
            //value={field.end}
            /* onChange={(item) =>
              setField({
                ...field,
                end: moment(
                  field.start.toISOString().split("T").shift() + " " + item
                ).toDate()
              })
            } */
            options={slots}
            getOptionLabel={(slots) => slots}
            getOptionValue={(slots) => slots}
          />
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginTop: "20px"
            }}
          >
            <button className="button" onClick={newEvent}>
              Add Event
            </button>
            <button className="button" onClick={() => setBlur(!blur)}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EventHome;
