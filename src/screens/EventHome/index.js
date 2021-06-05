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

const EventHome = ({ history }) => {
  const { state, logOut, setLoading } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [types, setTypes] = useState([]);
  const [selEt, setSelEt] = useState({ label: "Select Event type", value: "" });
  const [selSlo, setSelSlo] = useState({ label: "Select A Slot", value: "" });
  const slots = [
    { label: "10:00 AM - 10:30 AM", value: "10:00" },
    { label: "10:30 AM - 11:00 AM", value: "10:30" },
    { label: "11:00 AM - 11:30 AM", value: "11:00" },
    { label: "11:30 AM - 12:00 PM", value: "11:30" },
    { label: "12:00 PM - 12:30 PM", value: "12:00" },
    { label: "12:30 PM - 01:00 PM", value: "12:30" },
    { label: "01:00 PM - 01:30 PM", value: "13:00" },
    { label: "01:30 PM - 02:00 PM", value: "13:30" }
  ];
  const [blur, setBlur] = useState(false);
  const [day, setDay] = useState(moment().format("l"));
  const [field, setField] = useState({
    name: "",
    event_type: "",
    start: "",
    end: ""
  });

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
    if (res.data) {
      let arr = res.data.map((i) => ({ value: i, label: i }));
      console.log(arr);
      setTypes(arr);
    }
  };

  const newEvent = async () => {
    if (!field.name || !field.start || !field.end || !field.event_type) {
      alert("All fields are mandatory.");
    } else {
      setLoading(true);
      const res = await createEvent(field);
      setLoading(false);
      setBlur(!blur);
      if (res.data.id) {
        alert("New Event Created.");
      } else {
        alert("Something went error. Try again.");
      }
    }
  };

  const d = events.map((i) => ({
    dt: moment(i.start).format("l"),
    ty: i.event_type
  }));
  //console.log(d.find((x) => x.ty === "Bootcamp"));

  useEffect(() => {
    getEvents();
    getTypes();
  }, [blur]);
  console.log(field);

  if (state.loading) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }

  return (
    <>
      <div className={blur ? " active" : null}>
        <div className="container1">
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
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <strong style={{ marginBottom: "20px" }}>
            Your Scheduled Events
          </strong>
          <Calendar
            tileClassName={({ date, view }) => {
              if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() && x.ty === "Bootcamp"
                )
              ) {
                return "bg1";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() && x.ty === "Charity"
                )
              ) {
                return "bg2";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() &&
                    x.ty === "Charitable auctions"
                )
              ) {
                return "bg3";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() && x.ty === "Exhibitions"
                )
              ) {
                return "bg4";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() && x.ty === "Corporate"
                )
              ) {
                return "bg5";
              } else if (
                d.find(
                  (x) => x.dt === date.toLocaleDateString() && x.ty === "Family"
                )
              ) {
                return "bg6";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() && x.ty === "Fundraising"
                )
              ) {
                return "bg7";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() && x.ty === "Holiday"
                )
              ) {
                return "bg8";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() &&
                    x.ty === "Music events"
                )
              ) {
                return "bg9";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() &&
                    x.ty === "Networking events"
                )
              ) {
                return "bg10";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() &&
                    x.ty === "Product launches"
                )
              ) {
                return "bg11";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() &&
                    x.ty === "Sports events"
                )
              ) {
                return "bg12";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() &&
                    x.ty === "Sponsored runs"
                )
              ) {
                return "bg13";
              } else if (
                d.find(
                  (x) =>
                    x.dt === date.toLocaleDateString() && x.ty === "Trade shows"
                )
              ) {
                return "bg14";
              }
            }}
          />
        </div>

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
          <button
            className="button"
            onClick={() => {
              logOut(), history.replace("/");
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {blur ? (
        <div className="popup">
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <strong>Create A New Event</strong>
          </div>

          <input
            type="text"
            name="EventName"
            placeholder="Enter Event Name..."
            value={field.name}
            onChange={(e) => setField({ ...field, name: e.target.value })}
          />

          <Select
            value={selEt}
            onChange={(item) => (
              setSelEt(item), setField({ ...field, event_type: item.value })
            )}
            options={types}
          />
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              margin: "20px 0"
            }}
          >
            <Calendar
              defaultValue={new Date()}
              onChange={(date) => {
                let c = moment(date).format("l");
                setDay(c);
              }}
              minDate={new Date()}
            />
          </div>
          <Select
            value={selSlo}
            onChange={(item) =>
              setField({
                ...field,
                start: moment(day + " " + item.value).toISOString(),
                end: moment(day + " " + item.value)
                  .add(30, "minutes")
                  .toISOString()
              })
            }
            options={slots}
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
