'use client';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { events } from '@/app/components/events/mock';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
} from '@tanstack/react-table';
import Button from '../button';
import CopyButton from '../copyButton';
import AddEventButton from './addEventButton';
import AddEventModal from './addEventModal';
import ConfirmDelete from '../confirmDelete';
import { Event } from '@prisma/client';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { deleteEventByIdAction } from '@/lib/actions/eventCreationAction';

interface EventTableProps {
  eventsData: Event | any;
}

interface ColumnSort {
  id: string;
  desc: boolean;
}

interface SortingState {
  sorting: ColumnSort[];
}

interface RoleDataType {
  id: string;
  eventName: string;
  agenda: string;
  roomNumber: string;
  time: string | Date;
  date: string;
  totalSeat: string;
  details?: () => void;
  delete?: () => void;
}

interface CellProps<T> {
  row: {
    original: T;
  };
  handleEventDetail?: () => void;
  handleDeleteEvent?: () => void;
}

interface ColumnType {
  header: string;
  accessorKey: keyof RoleDataType;
  cell?: React.ComponentType<CellProps<RoleDataType>>;
  accessorFn?: (row: RoleDataType) => any;
}

const formatId = (id: string) => {
  if (id.length > 5) {
    return `${id.substring(0, 5)}...`;
  }
  return id;
};

const columns: ColumnType[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }: CellProps<RoleDataType>) => (
      <CopyButton
        originalValue={row.original.id}
        value={formatId(row.original.id)}
      />
    ),
  },
  {
    header: 'Event Name',
    accessorKey: 'eventName',
  },
  {
    header: 'Agenda',
    accessorKey: 'agenda',
    cell: ({ row }: CellProps<RoleDataType>) =>
      `${row.original.agenda.slice(0, 10)}...`,
  },
  {
    header: 'Room Number',
    accessorKey: 'roomNumber',
  },
  {
    header: 'Time',
    accessorKey: 'time',
    cell: ({ row }: CellProps<RoleDataType>) =>
      format(row.original.time, 'HH:mm a'),
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ row }: CellProps<RoleDataType>) =>
      format(row.original.date, 'yyyy-MM-dd'),
  },
  { header: 'Total Seat', accessorKey: 'totalSeat' },
  {
    header: 'Details',
    accessorKey: 'details',
    cell: ({ handleEventDetail }: CellProps<RoleDataType>) => (
      <button
        onClick={handleEventDetail}
        className="bg-textSoft text-bgOriginal rounded-md outline-none py-1 px-2 text-lg hover:bg-slate-400"
      >
        Details
      </button>
    ),
  },
  {
    header: 'Delete',
    accessorKey: 'delete',
    cell: ({ handleDeleteEvent }: CellProps<RoleDataType>) => (
      <button
        onClick={handleDeleteEvent}
        className="bg-red-600 text-white rounded-md outline-none py-1 px-2 text-lg hover:bg-red-700"
      >
        Delete
      </button>
    ),
  },
];

const EventTable = ({ eventsData }: EventTableProps) => {
  const eventList = useMemo(() => events, []);
  const eventMap = useMemo(() => {
    if (!eventsData || eventsData?.length === 0) return [];
    return eventsData.map((event: Event) => ({
      id: event.id,
      eventName: event.event_name,
      agenda: event.description,
      roomNumber: event.room_number,
      time: event.time,
      date: event.start_date,
      totalSeat: event.total_seat,
      lunchTime: event.lunch_time,
      startTime: event.start_date,
    }));
  }, [eventsData]);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState('');
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenDeleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string>('');
  const router = useRouter();

  const handleModalOpen = () => {
    setOpenModal((current) => !current);
  };

  const handleConfirmDeleteUser = async (id: string | null) => {
    try {
      if (eventId) {
        await deleteEventByIdAction({ id: eventId });
        toast.success('Event deleted successfully.');
        setDeleteUserModal(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error('Error while deleting event.');
    }
  };

  const closeDeleteModal = () => {
    setDeleteUserModal(false);
  };

  const handleDetailsClick = (data: any) => {
    const path = `/dashboard/events/event-details/${data.id}`;
    router.push(path);
  };

  const handleDeleteClick = (data: any) => {
    setEventId(data.id);
    setDeleteUserModal(true);
  };

  const table = useReactTable({
    data: eventMap,
    //@ts-ignore
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="bg-bgSoft p-5 rounded-md mx-3 w-full">
      <AddEventModal
        handleModalClose={() => setOpenModal(false)}
        showModal={isOpenModal}
        content="Create Event"
      />
      <ConfirmDelete
        isOpen={isOpenDeleteUserModal}
        confirm={() => handleConfirmDeleteUser(null)}
        handleClose={closeDeleteModal}
        content="Are you sure you want to delete this event?"
      />
      <>
        <h1 className="font-medium bg-bgSoft mb-2">Explore Users List</h1>
        <div className="flex items-center justify-between m-5">
          <div className="my-2 mb-3 border-none outline-none focus:border-transparent">
            <input
              className="bg-textSoft border-none focus:outline-none text-black rounded-sm w-40px px-3 py-1 placeholder-black"
              type="text"
              placeholder="Search...."
              name={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
          <AddEventButton handleClick={handleModalOpen} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-bgSoft">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-textSoft uppercase tracking-wider cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === false
                        ? null
                        : header.column.getIsSorted() === 'asc'
                        ? ' 🔼'
                        : header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {eventMap && eventMap.length !== 0 && (
              <tbody className="bg-bgSoft divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="transition-colors ">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-textSoft"
                        onClick={
                          cell.column.columnDef.header === 'Details'
                            ? () => handleDetailsClick(row.original)
                            : cell.column.columnDef.header === 'Delete'
                            ? () => handleDeleteClick(row.original)
                            : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!eventMap ||
            (eventMap?.length === 0 && (
              <div className="text-textSoft text-center self-center my-10">
                No Event Data.
              </div>
            ))}
          {eventMap && eventMap.length !== 0 && (
            <div className="mt-5">
              <Button
                handleClick={() => table.setPageIndex(0)}
                title="First page"
                disabled={false}
              />
              <Button
                disabled={!table.getCanPreviousPage()}
                handleClick={() => table.previousPage()}
                title="Prev Page"
              />
              <Button
                disabled={!table.getCanNextPage()}
                handleClick={() => table.nextPage()}
                title="Next Page"
              />
              <Button
                title="Last Page"
                handleClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={false}
              />
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default EventTable;
