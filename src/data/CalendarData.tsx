import * as React from "react";

import { ok as assert } from "assert";

import { CourseStoreLink } from "@/components/links/CourseStoreLink";
import { SiteLinks } from "@/data/SiteLinks";
import {
  AssignmentCalendarItem,
  CalendarDate,
  CalendarItem,
  CalendarWeek,
  EventCalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
  OfficeHourCalendarItem,
  StudioCalendarItem,
} from "@/types/CalendarData";
import {
  clamp as clampDate,
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
} from "date-fns";

const dayOfWeekValues = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
type dayOfWeek = (typeof dayOfWeekValues)[number];

const TIME_AND_LOCATION_LECTURE = {
  time: "10:00 to 11:20",
  location: "CSE2 G01",
};

const TIME_AND_LOCATION_SECTION = {
    time: "11:30 - 12:20 / 12:30 - 1:20",
    location: "MGH 058 / PAR 220",
};

const TIME_AND_LOCATION_POSTER_SESSION = {
  time: "10:00 to 11:20",
  location: "CSE2 G01",
};


export function parseCalendarDate(calendarDate: CalendarDate): Date {
  const parsedDate = datefnsParse(calendarDate, "yyyy-MM-dd", new Date());
  assert(datefnsIsValid(parsedDate), `Invalid date: ${calendarDate}`);

  return parsedDate;
}

export function formatCalendarDate(
  calendarDate: CalendarDate,
  format: string,
): string {
  return datefnsFormat(parseCalendarDate(calendarDate), format);
}

export function calendarDates(): CalendarDate[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): CalendarDate => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarWeeks(): CalendarWeek[] {
  return eachWeekOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((weekCurrent: Date): CalendarWeek => {
    return {
      startDate: datefnsFormat(weekCurrent, "yyyy-MM-dd"),
      dates: eachDayOfInterval({
        start: clampDate(weekCurrent, {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
        end: clampDate(endOfWeek(weekCurrent), {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
      }).map((dateCurrent): CalendarDate => {
        return datefnsFormat(dateCurrent, "yyyy-MM-dd");
      }),
    };
  });
}

export function calendarItems(): CalendarItem[] {
  return [
    ...Object.values(calendarData.assignments),
    ...calendarData.events,
    ...calendarData.holidays,
    ...calendarData.lectures,
    ...calendarData.officeHours,
    ...calendarData.studios,
  ];
}

export function calendarItemsForDate(
  calendarDate: CalendarDate,
): CalendarItem[] {
  return calendarItems().filter(
    (calendarItemCurrent: CalendarItem): boolean => {
      if ("date" in calendarItemCurrent) {
        return calendarDate === calendarItemCurrent.date;
      } else {
        return calendarItemCurrent.dates.includes(calendarDate);
      }
    },
  );
}

function verifyCalendarDate(
  calendarDate: CalendarDate,
  dayOfWeek: dayOfWeek,
): CalendarDate {
  assert(dayOfWeekValues.includes(dayOfWeek));

  const parsedDate = parseCalendarDate(calendarDate);
  const parsedDateDayOfWeek = datefnsFormat(parsedDate, "EEE");
  assert(
    parsedDateDayOfWeek === dayOfWeek,
    `Date ${calendarDate} is not ${dayOfWeek}`,
  );

  return calendarDate;
}

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  studios: StudioCalendarItem[];
  events: EventCalendarItem[];
  officeHours: OfficeHourCalendarItem[];
  assignments: { [key: string]: AssignmentCalendarItem };
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2025-01-06", "Mon"),
    end: verifyCalendarDate("2025-03-14", "Fri"),
  },

  holidays: [
    {
      type: "holiday",
      title: "Martin Luther King Jr. Day",
      date: verifyCalendarDate("2025-01-20", "Mon"),
    },
    {
      type: "holiday",
      title: "Presidents' Day",
      date: verifyCalendarDate("2025-02-17", "Mon"),
    },
  ],

  lectures: [
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-07", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Introduction and Overview",
      slides: "https://drive.google.com/file/d/1vgYZaVbb6GlbppqaJhmKsGyOB9E8wkNT/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-09", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design Diamond",
      slides: "https://drive.google.com/file/d/1GwgVDr0kaQFlArQzZA4ImTH9e9CCDPWJ/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-14", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Introduction to Critique",
      slides: "https://drive.google.com/file/d/1ctxocWaDhitivzDJQjgXo6dABEOAFV23/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-16", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design Research",
      slides: "https://drive.google.com/file/d/1L4LdXIcUSPTvPKfrAjKyPgSMGdB1HN7R/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-21", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "No Class -- Work on Milestone Report and Design Research",
      slides: "",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-23", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design of Everyday Things",
      slides: "https://drive.google.com/file/d/1aHS-Ve1M02_2Y5ZGCXMF8X3VN7QFBKvP/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-28", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Task Analysis",
      slides: "https://drive.google.com/file/d/178mudWN_BruVSrF4N0TNlHnhh0s3G0BN/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-01-30", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Storyboarding and Paper Prototyping",
      slides: "https://drive.google.com/file/d/1nuQU-SesXfWhZ696JUIgwqX2-eLX8J28/view?usp=drive_link",
    },
    {
        type: "lecture",
        dates: [verifyCalendarDate("2025-02-04", "Tue")],
        timeAndLocation: TIME_AND_LOCATION_LECTURE,
        title: "Task Review",
        slides: "https://drive.google.com/file/d/1O0zIALvJu6XOPI5aBBLfcA2Nd4Owrxon/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-02-06", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Models and Human Performance",
      slides: "https://drive.google.com/file/d/1Gi0zaaSxlYDyB3VrmLbLQ21dP5KU-38N/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-02-18", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Inspection and Usability Testing",
      slides: "https://drive.google.com/file/d/1dNYBV_ol9o7sii8-6wdpC2ISYta0iF4Y/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-02-20", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Patterns and Interface Implementation",
      slides: "https://drive.google.com/file/d/1TJXfi6GwJErg6gEOIDg-5KgmeZR-g03D/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-02-25", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Societal Impacts of Technology",
      slides: "https://drive.google.com/file/d/1ZGE7-K0FhCEwX_BE6cNZ2fbblrYoPgIm/view?usp=drive_link",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-02-27", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "History & Exam Q&A",
      slides: "https://drive.google.com/file/d/13cjj7WD3t5WpfXh9m6k8EkRK8qbqxRq-/view?usp=drive_link",
    },
    {
        type: "lecture",
        date: verifyCalendarDate("2025-03-06", "Thu"),
        timeAndLocation: TIME_AND_LOCATION_LECTURE,
        title: "Communicating Your Design",
        slides: "",
      },
  ],

  studios: [
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-01-10", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "https://docs.google.com/presentation/d/1_qE0wfssWxJrQKNKOesRHenYa207y4N4/edit?usp=drive_link&ouid=106501122493213215517&rtpof=true&sd=true",
    },
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-01-17", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "https://docs.google.com/presentation/d/1Yxg6oHX3xean24cqGFkzRvy-k57sM7kU3i8ewkrnhOs/edit?usp=drive_link",
    },
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-01-24", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "https://docs.google.com/presentation/d/1dlBSkGbiZMJKZg-gl8me79RduWmmgSFs32mXbGn4dUw/edit#slide=id.p",
    },
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-01-31", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "",
    },
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-02-21", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "",
    },
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-02-28", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "",
    },  
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-02-07", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "",
    },
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-02-14", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "",
    },
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-03-07", "Fri")],
        timeAndLocation: TIME_AND_LOCATION_SECTION,
        title: "Studio",
        slides: "",
    },  
    {
        type: "studio",
        dates: [verifyCalendarDate("2025-03-11", "Tue")],
        timeAndLocation: TIME_AND_LOCATION_LECTURE,
        title: "Poster and Mockup Design Critique",
    },
    {
        type: "studio",
        title: "Design Critique",
        dates: [
            verifyCalendarDate("2025-02-11", "Tue"),
            verifyCalendarDate("2025-02-13", "Thu"),
        ],
        timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
  ],

  events: [
    // {
    //   type: "event",
    //   title: "Exam Q&A",
    //   date: verifyCalendarDate("2024-11-18", "Mon"),
    //   timeAndLocation: TIME_AND_LOCATION_EXAM_QA,
    //   slides: "https://canvas.uw.edu/files/126571016/",
    // },
    {
      type: "event",
      title: "Exam",
      date: verifyCalendarDate("2025-03-04", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
    {
      type: "event",
      title: "Poster Session",
      date: verifyCalendarDate("2025-03-13", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_POSTER_SESSION,
    },
  ],

  officeHours: [
    // {
    //   type: "officeHour",
    //   title: "Office Hour: Katelyn",
    //   timeAndLocation: TIME_AND_LOCATION_OFFICE_HOUR_KATELYN,
    //   dates: [
    //     verifyCalendarDate("2024-10-02", "Wed"),
    //     verifyCalendarDate("2024-10-09", "Wed"),
    //     verifyCalendarDate("2024-10-16", "Wed"),
    //     verifyCalendarDate("2024-10-23", "Wed"),
    //     verifyCalendarDate("2024-10-30", "Wed"),
    //     verifyCalendarDate("2024-11-06", "Wed"),
    //     verifyCalendarDate("2024-11-13", "Wed"),
    //     verifyCalendarDate("2024-11-20", "Wed"),
    //     verifyCalendarDate("2024-12-04", "Wed"),
    //   ],
    // },
  ],

  assignments: {
    //
    // Assignment 0
    //
    assignment_0: {
      type: "assignment",
      title: "Assignment 0: Introduction Slide",
      link: SiteLinks.assignment_0_top.href,
      date: verifyCalendarDate("2025-01-09", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882188",
    },

    //
    // Milestone 1
    //
    assignment_1_1: {
      type: "assignment",
      title: "Assignment 1.1: Individual Brainstorm",
      link: SiteLinks.assignment_1_1_top.href,
      date: verifyCalendarDate("2025-01-09", "Thu"),
      submission: "canvas", 
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882189",
    },
    assignment_1_2: {
      type: "assignment",
      title: "Assignment 1.2: Group Proposals", 
      link: SiteLinks.assignment_1_2_top.href,
      date: verifyCalendarDate("2025-01-13", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882190",
    },
    assignment_1_3: {
      type: "assignment",
      title: "Assignment 1.3: Final Proposal",
      link: SiteLinks.assignment_1_3_top.href,
      date: verifyCalendarDate("2025-01-15", "Wed"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882208",
    },
    assignment_1_4: {
      type: "assignment",
      title: "Assignment 1.4: Design Ideation",
      link: SiteLinks.assignment_1_4_top.href,
      date: verifyCalendarDate("2025-01-18", "Sat"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882192",
    },
    milestone_1_report: {
      type: "assignment",
      title: "Milestone 1: Report",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2025-01-21", "Tue"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882208",
    },

    //
    // Milestone 2
    //
    assignment_2_1: {
      type: "assignment",
      title: "Assignment 2.1: Design Research Plan",
      link: SiteLinks.assignment_2_1_top.href,
      date: verifyCalendarDate("2025-01-23", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882193",
    },
    assignment_2_2: {
      type: "assignment",
      title: "Assignment 2.2: Design Research Check-In",
      link: SiteLinks.assignment_2_2_top.href,
      date: verifyCalendarDate("2025-01-28", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882194",
    },
    milestone_2_report: {
      type: "assignment",
      title: "Milestone 2: Report",
      link: SiteLinks.milestone_2_report_top.href,
      date: verifyCalendarDate("2025-02-03", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882210",
    },

    //
    // Milestone 3
    //
    assignment_3_1: {
      type: "assignment",
      title: "Assignment 3.1: Task Review",
      link: SiteLinks.assignment_3_1_top.href,
      date: verifyCalendarDate("2025-02-05", "Wed"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882195",
    },
    assignment_3_2: {
      type: "assignment",
      title: "Assignment 3.2: Design Review",
      link: SiteLinks.assignment_3_2_top.href,
      date: verifyCalendarDate("2025-02-10", "Mon"),
      submission: "canvas",
      submitCanvasTime: "03:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882196",
    },
    assignment_3_3: {
      type: "assignment",
      title: "Design Critique",
      link: SiteLinks.assignment_3_3_top.href,
      date: verifyCalendarDate("2025-02-09", "Sun"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9962586",
    },
    assignment_3_4: {
      type: "assignment",
      title: "Assignment 3.3: Scenarios and Storyboards",
      link: SiteLinks.assignment_3_4_top.href,
      date: verifyCalendarDate("2025-02-17", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882197",
    },
    milestone_3_report: {
      type: "assignment",
      title: "Milestone 3: Report",
      link: SiteLinks.milestone_3_report_top.href,
      date: verifyCalendarDate("2025-02-21", "Fri"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882212",
    },

    //
    // Milestone 4
    //
    assignment_4_1: {
      type: "assignment",
      title: "Assignment 4.1: Paper Prototype",
      link: SiteLinks.assignment_4_1_top.href,
      date: verifyCalendarDate("2025-02-24", "Mon"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882198",
    },
    assignment_4_2: {
      type: "assignment",
      title: "Assignment 4.2: Heuristic Evaluation",
      link: SiteLinks.assignment_4_2_top.href,
      date: verifyCalendarDate("2025-02-26", "Wed"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882199",
    },
    assignment_4_3: {
      type: "assignment",
      title: "Assignment 4.3: Usability Testing",
      link: SiteLinks.assignment_4_3_top.href,
      date: verifyCalendarDate("2025-03-05", "Wed"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882200",
    },
    milestone_4_report: {
      type: "assignment",
      title: "Milestone 4: Report",
      link: SiteLinks.milestone_4_report_top.href,
      date: verifyCalendarDate("2025-03-07", "Fri"),
      submission: "canvas",
      submitCanvasTime: "11:59pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882214",
    },

    //
    // Milestone 5
    //

    // assignment_5_poster_initial: {
    //   type: "assignment",
    //   title: "Assignment 5: Initial Poster",
    //   link: SiteLinks.assignment_5_poster_top.href,
    //   date: verifyCalendarDate("2025-03-12", "Wed"),
    //   submission: "canvas",
    //   submitCanvasTime: "11:59pm",
    //   submitCanvasLink:
    //     "https://canvas.uw.edu/courses/1779838/assignments/9882203",
    // },
    assignment_5_poster_final: {
      type: "assignment",
      title: "Assignment 5.1: Poster",
      link: SiteLinks.assignment_5_poster_top.href,
      date: verifyCalendarDate("2025-03-11", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1779838/assignments/9882202",
    },
    assignment_5_digital_mockup: {
        type: "assignment",
        title: "Assignment 5.2: Digital Mockup",
        link: SiteLinks.assignment_5_digital_mockup_top.href,
        date: verifyCalendarDate("2025-03-11", "Tue"),
        submission: "canvas",
        submitCanvasTime: "3:00pm",
        submitCanvasLink:
          "https://canvas.uw.edu/courses/1779838/assignments/9882201",
    },
    assignment_5_pitch: {
      type: "assignment",
      title: "Assignment 5.3: Project Pitch",
      link: SiteLinks.assignment_5_pitch_top.href,
      date: verifyCalendarDate("2025-03-13", "Thu"),
      submission: "canvas",
      submitCanvasTime: "10:00am",
      submitCanvasLink: "https://canvas.uw.edu/courses/1779838/assignments/9882204"
    },
  },
};
